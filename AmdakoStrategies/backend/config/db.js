import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("MONGO_URI is not set in environment variables.");
      }
      console.warn("No MONGO_URI found. Skipping MongoDB and using local JSON storage for development/testing.");
      return;
    }
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;