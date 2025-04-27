import { Router } from "express";
import { addBlog, deleteBlog, fetchAllblog, updateBlog } from "../controllers/blog.controllers.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const blogRouter = Router();

blogRouter.route("/addblog").post(
  verifyJwt,
  upload.fields([
    {
      name: "blogPic",
      maxCount: 1,
    },
  ]),
  addBlog
);

blogRouter.route("/deleteblog/:id").delete(verifyJwt, deleteBlog);

blogRouter.route("/updateblog/:blogId").patch(verifyJwt, upload.single("blogPic") ,updateBlog);

blogRouter.route("/getallblogs").get(verifyJwt, fetchAllblog);

export default blogRouter;
