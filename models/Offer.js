import mongoose from "mongoose";


const offerSchema = new mongoose.Schema(
    {
        offerId: {
            type: String,
            unique: true
        },

        application: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true
        },

        salary: Number,
        shift: String,

        joiningDate: Date,
        validityDate: Date,

        status: {
            type: String,
            enum: ["SENT", "ACCEPTED", "REJECTED", "EXPIRED"],
            default: "SENT"
        },

        offerLetterUrl: String,

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Offer", offerSchema);
