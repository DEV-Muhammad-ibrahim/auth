

import connection from "@/server/connection";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
// import _ from "lodash";
import Blog from "@/models/Blog";

import { getDataFromToken } from "@/helpers/getData";

export async function POST(req: NextRequest) {
  connection()
    const formData = await req.formData();
  
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
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }
  
    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${
      image.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.extension(image.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;
  
    const userId = await getDataFromToken(req)
   if(!userId){
    return NextResponse.json({message:"Please login"})
   }
    
      // Save to database
      if(existingBlog){
      return NextResponse.json({message:"Title existing"})
    }
      const result = new Blog({
        
          title,
          image: fileUrl,
          description,
          author:userId,
        
      });

     await result.save()
      return NextResponse.json({ user: result });
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong in putting it into database." },
        { status: 500 }
      );
    }
  }