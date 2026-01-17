import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    experienceRequired: String,
    shift: String,
    location: String,
    hiringzone: String,
    vacancies: {
        type: Number,
        required: true
    },
    postingChannels: [String],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["OPEN", "CLOSED", "EXPIRED"],
        default: "OPEN"
    },
    totalApplications: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Job = mongoose.model("JOB", jobSchema)
export default Job