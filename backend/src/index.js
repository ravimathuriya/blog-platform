import { app } from "./app.js";
import "dotenv/config";
import connectDB from "./db/db.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`app is running at port: ${process.env.PORT}`)
    })}
)
.catch((error)=>{
    console.log("connection failed", error)
})