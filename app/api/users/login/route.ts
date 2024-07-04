import User from "@/models/User";
import connection from "@/server/connection";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

connection()

export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json()
    const {email,password} = reqBody
   

    const user = await User.findOne({email})
    if(!user) {
      return NextResponse.json({error:"User Does not Exist"},{status:400})
    }
    console.log("User exists")
     const validPassword =  await bcrypt.compare(password,user.password)
     if(!validPassword) {
      return NextResponse.json({error:"Credentials does not match"},{status:400})
     }
     console.log("Credentials match")
     const tokenData = {
      id:user._id,
      name:user.name,
      email:user.email
     }
     
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"})
   
  const response = NextResponse.json({message:"User Successfully Loged In",success:true,})
  response.cookies.set("token",token,{httpOnly:true})
   return response 
} catch (error:any) {
    return NextResponse.json({error:error.message,message:"something went wrong"},{status:500})
  }
}
