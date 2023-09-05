import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongo already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
