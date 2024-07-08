import mongoose from "mongoose";

interface ConnectionObject{
  isConnected?:number
}
const connection:ConnectionObject = {}
export default async function dbConnection() {
  if(connection.isConnected){
    console.log("Already Connected to database",connection.isConnected)
    return
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI || '',{})
    connection.isConnected = db.connections[0].readyState
    console.log('db',db)
    console.log('Connected to database')
  } catch (error:any) {
    console.log("Something went wrong while connecting to database",error);
    process.exit(1)
  }
  
}