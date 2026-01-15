import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import db from "./config/db.js";
dotenv.config({ quiet: true })

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


db()
app.listen(process.env.PORT, () => {
    console.log("Running on port", process.env.PORT);
})
