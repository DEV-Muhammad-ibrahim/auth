import { getDataFromToken } from "@/helpers/getData";
import Blog from "@/models/Blog";
import connection from "@/server/connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest){
  connection()
  try {
    const userId = await getDataFromToken(req)
    const blogs = await Blog.find({author:userId})
    if(blogs){
      return NextResponse.json(blogs)
    }
    
  } catch (error:any) {
   return NextResponse.json({message:"Something went wrong",error:error},{status:400})
  }
}