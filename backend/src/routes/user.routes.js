import { Router } from "express";
import { changePassword, changeProfileImage, getUserProfile, logInUser, logOutUser, registerUser } from "../controllers/users.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import verifyJwt from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.route("/register").post( upload.fields([
    {name:"profilePic",
        maxCount:1
    }
]), registerUser)

userRouter.route("/login").post(logInUser)

userRouter.route("/logout").post(verifyJwt, logOutUser)

userRouter.route("/changepassword").patch(verifyJwt, changePassword)

userRouter.route("/updateprofileimage").patch(verifyJwt, upload.single("profilePic") ,changeProfileImage)

userRouter.route("/getuser/:userId").get( verifyJwt, getUserProfile)

export default userRouter