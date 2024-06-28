import User from "@/models/User";
import connection from "@/server/connection";
import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt'

import { sendEmail } from "@/helpers/mailer";
connection()
export async function POST(request: NextRequest, response: NextResponse) {
  try{
   const reqBody = await request.json()
   const {name,email,password} = reqBody
    
   //validation

   const user = await User.findOne({email});
   if(user){
    return NextResponse.json({message:"User already exists"})
   }
   const newUser = new User({
    name,
    email,
    password
   })
   const savedUser = await newUser.save()
  // console.log(savedUser)
    
  //send verification email
   
    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id,savedUser:savedUser})
    return NextResponse.json({
      message:"User Registered Successfully",
      success:true,
      savedUser
    })
  }catch(error:any){
    NextResponse.json({message:`Error While creating user ${error.message}` })
  }
 
}