import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/pronos")
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;