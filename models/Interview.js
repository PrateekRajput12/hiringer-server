import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    interviewId: {
        type: String,
        unique: true
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    },
    round: {
        type: Number,
        min: 1,
        max: 4,
        required: true
    },
    interviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    scheduledAt: Date,
    mode: {
        type: String,
        enum: ["ONLINE", "OFFLINE"]
    },
    feedback: {
        rating: Number,
        comments: String
    },
    result: {
        type: String,
        enum: ["PASS", "FAIL"]
    }
}, { timestamps: true })

const Interview = mongoose.model("Interview", interviewSchema)
export default Interview