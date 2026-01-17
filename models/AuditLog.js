import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        action: String,
        entity: String,
        entityId: String,

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        details: String
    },
    { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
