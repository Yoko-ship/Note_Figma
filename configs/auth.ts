import GoogleProvider from "next-auth/providers/google"
import type { AuthOptions, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { pool } from "@/lib/db"
import bcrypt from "bcrypt"
export const authConfig:AuthOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.NEXT_PUBLIC_CLIENTID!,
            clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET!,
        }),
        Credentials({
            credentials:{
                email:{label:"email",type:"email",required:true},    
                password:{label:"password",type:"password",required:true},
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password) return null

                const checkUserQuery = "SELECT * FROM users WHERE email = $1"
                const isUser = await pool.query(checkUserQuery,[credentials.email])
                if(isUser.rows.length === 0){
                    throw new Error("Пользователь с такой почтой не существует")
                }
                const comparePassword = isUser.rows[0].password
                const checkHashedPassword = await bcrypt.compare(credentials.password,comparePassword)
                if(checkHashedPassword){
                    return {id:isUser.rows[0].id,email:isUser.rows[0].email,name:isUser.rows[0].email}
                }
                else{
                    throw new Error("Почта или пароль неправильный")
                }
            }

        })
    ],
    // Сохраняю user'a из гугла в бз
    session:{
        strategy:'jwt'
    },
    callbacks:{
        async signIn({user,account}){
            if(account?.provider === "google"){
                const checkUser = await pool.query("SELECT * FROM users WHERE email = $1",[user.email])
                if(checkUser.rows.length === 0){
                    await pool.query("INSERT INTO users(email,password) VALUES($1,$2)",[user.email,""])
                }
                
            }
            return true
        },
        async jwt({token,user}){
            if (user) token.id = user.id;
            return token;
        },
        async session({session,token}){
            if(token?.email && session.user){
                session.user.email = token.email as string
            }
            return session
        }

        
    },

    pages:{
        signIn:"/signIn"
    }
}