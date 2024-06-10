import User from "@/models/User";
import connection from "@/server/connection";
import { NextRequest,NextResponse } from "next/server";


connection()

export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json()
    const {token} = reqBody
    console.log(token)
    const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
    if(!user) {
      return NextResponse.json({error:"Invalid token"},{status:400})
    }
    user.isVerfied = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()
    return NextResponse.json(
      {
        message:"User Verified Successfully",
        sucess:true,
        status:500
      }
   
  )
  } catch (error) {
    return NextResponse.json({message:"Error"})
  }
}