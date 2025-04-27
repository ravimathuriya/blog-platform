import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import "dotenv/config";
import { User } from "../models/user.models.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("accessToken") ||
      req.header("Authorization").replace("Bearer ", "") 

    if (!token) {
      res.status(500).json({
        message: "You are not authorized",
      });
    }

    const verifyUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const findUserDetails = await User.findById(verifyUser._id).select(
      "-password -accessToken -refreshToken"
    );

    if (!findUserDetails) {
      res.status(500).json({
        message: "Invalid access token",
      });
    }

    req.user = findUserDetails;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong while authenticate the user",
    });
    next(error);
  }
});

export default verifyJwt;
