import { getServerSession } from "next-auth"
import { authConfig } from "@/configs/auth"
import classes from "./page.module.css"

export default async function Page(){
    const session = await getServerSession(authConfig)

    return(
        <div className={classes.profile}>
            <h1>Profile of {session?.user?.name}</h1>
            {session?.user?.image && (
                <img src={session.user.image} alt="profile-image"/>
            )}
        </div>
    )
}