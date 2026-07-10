import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("URI =", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected");

    return conn;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export default connectDB;