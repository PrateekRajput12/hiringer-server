import { number } from "framer-motion";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, role: {
        type: String,
        enum: ["HR", "Interviewer", "Manager"],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }


}, { timestamps: true })
