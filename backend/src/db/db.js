import mongoose from "mongoose";
import "dotenv/config";
import dbName from "../constant.js";

const connectDB = async() => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`);
    console.log(`mongoose connected at ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log("mongoose not connected", error);
  }
};

export default connectDB;
