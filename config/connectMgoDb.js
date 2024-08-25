import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
    
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default ConnectDB;
