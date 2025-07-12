import { pool } from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export async function POST(req:NextRequest){
    const body = await req.json()
    const {email,password} = body
    if(!email || !password){
        return NextResponse.json({error:"Отсутствует пароль или почта"},{status:402})
    }
    const checkUserQuery = "SELECT * FROM users WHERE email = $1"
    const isUser = await pool.query(checkUserQuery,[email])
    if(isUser.rows.length === 0){
        return NextResponse.json({error:"Пользователь с такой почтой не существует"},{status:402})
    }
    const comparePassword = isUser.rows[0].password
    const checkHashedPassword = await bcrypt.compare(password,comparePassword)
    if(!checkHashedPassword){
        return NextResponse.json({error:"Пароль не совпадает"},{status:402})
    }
    
    const token = jwt.sign({email:isUser.rows[0].email,id:isUser.rows[0].id},process.env.NEXT_PUBLIC_SECRET_KEY!,{
        expiresIn:"1h"
    })
    return NextResponse.json({success:"Вы успешно вошли в аккаунт",token},{status:202})
    

}