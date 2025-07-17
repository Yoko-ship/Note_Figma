import { pool } from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";
export async function GET(req:NextRequest){
    const createTable = `
        CREATE TABLE IF NOT EXISTS notes(
            id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            deadline VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            priority VARCHAR NOT NULL,
            user_email VARCHAR NOT NULL,
            FOREIGN KEY(user_email) REFERENCES users(email) ON DELETE CASCADE            
        )
    `
    const { searchParams } = new URL(req.url)
    const userEmail = searchParams.get("userEmail")
    const selectQuery = "SELECT * FROM notes WHERE user_email = $1"
    const result = await pool.query(selectQuery,[userEmail])
    return NextResponse.json(result.rows,{status:202})
}


export async function POST(req:NextRequest){
    const body = await req.json()
    const {title,deadline,description,priority,userEmail} = body
    console.log(title,deadline,description,priority,userEmail)

    if(!title || !deadline || !description || !priority || !userEmail){
        return NextResponse.json({error:"Заполните все поля"},{status:402})
    }
    const insertQuery = `INSERT INTO notes(title,deadline,description,priority,user_email) VALUES($1,$2,$3,$4,$5)`
    await pool.query(insertQuery,[title,deadline,description,priority,userEmail])

    return NextResponse.json({success:"Заметка была успешно добавлена"},{status:202})
}

export async function DELETE(req:NextRequest){
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id")

    const deleteQuery = "DELETE FROM notes WHERE id=$1"
    await pool.query(deleteQuery,[id])
    return NextResponse.json({success:"Вы успешно удалили заметку"},{status:202})
}