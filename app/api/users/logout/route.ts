
import connection from "@/server/connection";
import { NextResponse, NextRequest } from "next/server";


connection()

export async function POST(request:NextRequest){
  try {
   const response = NextResponse.json({
      message:"logout Sucessfully",
      success:true
    })
    const token = request.cookies.get("token")?.value
    if(token){
      response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0)
      })
      return response
    }else{
      return NextResponse.json({message:"Please Login"})
    }
   
    
  } catch (error:any) {
    NextResponse.json({error:error.message},{status:400})
  }
}