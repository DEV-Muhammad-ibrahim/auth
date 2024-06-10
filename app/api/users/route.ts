// import User from "@/models/User";
// import connection from "@/server/connection";
// import mongoose from "mongoose";
// import { NextApiRequest } from "next";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try{
//     await connection();
//     const { name, email, password, roles} = await request.json();
//     const user = await User.create({ name, email, password ,roles});
//     return NextResponse.json({ message: "User created", user });
//   }catch(error){
//     NextResponse.json({message:"Error While creating user "})
//   }
 
// }
// export async function DELETE(request:Request) {
//   await connection();
//   const id = request.nextUrl.searchParams.get("id");
//   await User.findByIdAndDelete(id);

// }
