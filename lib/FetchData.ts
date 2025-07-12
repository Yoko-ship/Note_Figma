import { SetStateAction } from "react"

export const loginHanlder = async(url:string,data:{email:string,password:string},setError:React.Dispatch<SetStateAction<string>>,setSuccess:React.Dispatch<SetStateAction<string>>) =>{
    const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    const status = await response.json()
    const token = status.token
    setError(status.error)
    setSuccess(status.success)
    return token
}