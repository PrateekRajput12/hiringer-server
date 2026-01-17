import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    applicationId: {
        type: String,
        unique: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    candidate: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true }
    },
    resumeUrl: String,
    source: String,
    status: {
        type: String,
        enum: [
            "APPLIED",
            "SCREENED",
            "R1_PASSED",
            "R2_PASSED",
            "R3_PASSED",
            "R4_PASSED",
            "SELECTED",
            "REJECTED",
            "HIRED"
        ],
        default: "APPLIED"
    },
    currentRound: {
        type: Number,
        default: 0
    },
    rejectionReason: String,
    history: [
        {
            status: String,
            changedAt: Date,
            changedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ]
}, { timestamps: true })

const Application = mongoose.model("Application", applicationSchema)
export default Application