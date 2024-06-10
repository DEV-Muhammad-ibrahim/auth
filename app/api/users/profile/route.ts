import User from "@/models/User";
import connection from "@/server/connection";
import { NextResponse, NextRequest } from "next/server";

import { getDataFromToken } from "@/helpers/getData";

connection()

export async function POST(request:NextRequest){
  try {
  const userId = await getDataFromToken(request)
  const user = await  User.findOne({_id:userId}).select("-password")
  if(!user){
    return NextResponse.json({message:"Something went wrong"},{status:400})
  }
  return NextResponse.json({
    message:"User found",
    data:user
  })
  } catch (error:any) {
    return NextResponse.json({error:error.messsage},{status:400})
  }
}