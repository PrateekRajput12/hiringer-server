import mongoose from "mongoose";

const db = async (req, res) => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("db successfully connected")
    } catch (error) {
        console.log(error);
    }
}

export default db