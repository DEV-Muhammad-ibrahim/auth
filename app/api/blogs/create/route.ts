import Blog from "@/models/Blog";
import User from "@/models/Blog";
import connection from "@/server/connection";


import { NextResponse, NextRequest } from "next/server";



connection()
export async function POST(request: NextRequest, response: NextResponse) {
  try{
   const reqBody = await request.json()
   const {title,image,description,author} = reqBody
    
   if(!title || !image || !description || !author){
    return NextResponse.json({message:"Credentials are required"})
   }
    const response = NextResponse.json({message:"Blog Posted"},{status:200})
  
  

  }catch(error:any){
    NextResponse.json({message:`Error While creating Blog ${error.message}` })
  }
 
}