import Blog from "@/models/Blog";
import connection from "@/server/connection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  connection()
  const reqBody = await req.json();
  const {id} = reqBody
  try {
    const deleted = await Blog.findByIdAndDelete(id);
    if(deleted){
      return NextResponse.json({message:"Blog Deleted Successfully"},{status:200})
    }
    
  } catch (error:any) {
    return NextResponse.json({message:"Something went wrong"},{status:400})
  }

}