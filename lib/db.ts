import { Pool } from "pg"

export const pool = new Pool({
    database:process.env.NEXT_PUBLIC_DBNAME,
    password:process.env.NEXT_PUBLIC_PASSWORD,
    port:Number(process.env.NEXT_PUBLIC_PORT),
    host:process.env.NEXT_PUBLIC_HOST,
    user:process.env.NEXT_PUBLIC_USER,
})

