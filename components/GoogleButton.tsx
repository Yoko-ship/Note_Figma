'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import classes from "@/app/signIn/page.module.css"     
function GoogleButton() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || '/profile'
    console.log(callbackUrl)
  return (
    <div className={classes.signButton}>
      <button onClick={() => signIn("google",{callbackUrl})} type='button'>Sign in with Google</button>
    </div>
  )
}

export default GoogleButton