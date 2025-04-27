import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return await next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    const compared = await bcrypt.compare(password, this.password)
    return compared
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id:this._id,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"1h"}
)
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id:this._id,
        username:this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:"10h"}
)
}

export const User = mongoose.model("User", userSchema);
