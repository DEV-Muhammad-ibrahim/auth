import mongoose, { Document, Schema } from "mongoose";

interface IBlog extends Document {
  title: string;
  image?: string;
  time: number;
  description: string;
  author: string;
}
const BlogSchema : Schema = new Schema({
  title: {type:String, required:true,unique:true},
  image:{type:String,required:false},
  description:{type:String,required:true},
  author: {
    type: String,
    required: true,
  },
},{
  timestamps:true
})


const Blog = mongoose.models.authBlog || mongoose.model<IBlog>("authBlog", BlogSchema)

export default Blog;