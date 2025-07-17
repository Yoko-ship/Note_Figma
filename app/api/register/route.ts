import { pool } from "@/lib/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export  async function GET(){
    const createTable = `
        CREATE TABLE IF NOT EXISTS users(
            email VARCHAR PRIMARY KEY,
            password VARCHAR NOT NULL
        )
    `
    await pool.query(createTable)

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
    const insertQuery = "INSERT INTO users(email,password) VALUES($1,$2)"
    await pool.query(insertQuery,[email,hashedPassword])
    return NextResponse.json({success:"Вы успешно авторизовались"},{status:202})


}