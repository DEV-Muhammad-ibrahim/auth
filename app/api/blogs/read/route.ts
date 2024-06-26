import Blog from "@/models/Blog";
import connection from "@/server/connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest){
  connection();
  try {
    const blogs = await Blog.find().lean()
    if(blogs){
      return NextResponse.json(blogs)
    }
    
  } catch (error:any) {
    return NextResponse.json({message:"Something went wrong in getting blogs"},{status:400})
  }
}