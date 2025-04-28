import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
const app = express();

app.use(cors({ origin:"https://blog-platform-frontend-2x10.onrender.com", credentials: true }));

app.use(cookieParser());

app.use(express.static("public"));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ limit: "16kb", extended: true }));

//importing routers
app.use("/api/v1/users", userRouter)
app.use("/api/v1/blogs", blogRouter)

app.get("/", (req, res) => {  
  res.status(202).send("Hello");
});

export { app };
