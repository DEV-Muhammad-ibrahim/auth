

import connection from "@/server/connection";
import mime from "mime";
import { join } from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
// import _ from "lodash";
import Blog from "@/models/Blog";

import { getDataFromToken } from "@/helpers/getData";

export async function POST(req: NextRequest) {
  connection()
  
    const formData = await req.formData();
    const blogId = formData.get('id') as string || null;
    const title = formData.get("title") as string || null;
    const description = formData.get("description") as string || null;
    const image = formData.get("image") as File || null;
    const existingBlog = await Blog.findOne({title})
    
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;
  
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  
    
  
    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${
      image.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.extension(image.type)}`;
      
      const fileUrl = `${relativeUploadDir}/${filename}`;
  
    const userId = await getDataFromToken(req)
   if(!userId){
    return NextResponse.json({message:"Please login"})
   }
    
      // Save to database
      if(!existingBlog){
      const updateBlog = await Blog.findByIdAndUpdate(blogId,{
        title,
        description,
        image:fileUrl,
      })
      
       await writeFile(`${uploadDir}/${filename}`, buffer);
       return NextResponse.json({ user: updateBlog });
      }else{
        return NextResponse.json({message:"Title existing"})
        
      }
      
    
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong in putting it into database." },
        { status: 500 }
      );
    }
  }