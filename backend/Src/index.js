import express from"express";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { app, server } from "./lib/socket.js";


dotenv.config();

const PORT=process.env.PORT;

const __dirname=path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json({limit: '2mb'}));
app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}



server.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}`);
    connectDB();
})