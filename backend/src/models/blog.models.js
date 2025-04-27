import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    blogPic:{
        type:String,
        required:true
    },
    postedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
},{timestamps:true})

export const Blog = mongoose.model("Blog", blogSchema)