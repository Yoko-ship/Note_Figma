import SignInForm from '@/components/SignInForm'
import React from 'react'
import classes from "./page.module.css"

function page() {
  return (
    <div className={classes.signIn}>
      <h1>Sign In</h1>
      <SignInForm/>
    </div>
    )
}

export default page