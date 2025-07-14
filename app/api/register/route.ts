import { pool } from "@/lib/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export  async function GET(){
    const createTable = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL
        )
    `
    // await pool.query(createTable)

}

export async function POST(req:NextRequest){
    const body = await req.json()
    const {email,password } = body

    if(!email || !password){
        return NextResponse.json({error:"Отсутствует пароль или почта"},{status:400})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const emails = "SELECT * FROM users WHERE email = $1"
    const checkEmail = await pool.query(emails,[email])
    
    if(checkEmail.rows.length > 0){
        return NextResponse.json({error:"Пользователь с такой почтой уже существует"},{status:402})
    }
    const insertQuery = "INSERT INTO users(email,password) VALUES($1,$2) RETURNING id"
    const result = await pool.query(insertQuery,[email,hashedPassword])

    if(result.rows.length > 0){
        const token = jwt.sign({email:result.rows[0].email,id:result.rows[0].id},process.env.NEXT_PUBLIC_SECRET_KEY!,{
            expiresIn:'1h'
        })
        return NextResponse.json({success:"Вы успешно зарегистрировались",token},{status:201})
    }

}