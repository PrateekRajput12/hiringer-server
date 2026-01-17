import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import db from "./config/db.js"
import UserRouter from './router/authentication.js'
import cookieParser from "cookie-parser";
dotenv.config({ quiet: true })

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Auth
app.use("/api/auth", UserRouter)
db()
app.listen(process.env.PORT, () => {
    console.log("Running on port", process.env.PORT);
})
