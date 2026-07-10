import express from "express";
import dotenv from "dotenv";

import connectDB from "../config/db.js";

dotenv.config();

await connectDB();

const app = express();

app.get("/", (req,res)=>{
    res.json({
        success:true,
        message:"Database Connected"
    });
});

export default app;