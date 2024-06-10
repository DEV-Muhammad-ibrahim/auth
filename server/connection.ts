import mongoose from "mongoose";


export default async function connection() {
  try {
    const connect = mongoose.connect(process.env.MONGO_DB_URI!);
    const connection = mongoose.connection
    connection.on("connected",() =>{
      console.log("MONGO DB CONNECTED")
    })
    connection.on('error',(err) => {
      console.log("Please connect to database" + err)
      process.exit()
    })
  
  } catch (error:any) {
    console.log("Something went wrong while connecting to database");
    console.log(error)
  }
  
}