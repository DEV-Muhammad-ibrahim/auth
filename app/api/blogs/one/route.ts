import Blog from "@/models/Blog";
import connection from "@/server/connection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  connection()
  const reqBody = await req.json();
  const {id} = reqBody
  try {
    const blog = await Blog.findById(id);
    if(blog){
      return NextResponse.json(blog)
    }
    
  } catch (error:any) {
    return NextResponse.json({message:"Something went wrong"},{status:400})
  }

}