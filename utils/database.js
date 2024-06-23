import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

let isConnected = false;

export const connectToDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    console.log("MONGODB_URI: ", mongoURI);

    await mongoose.connect(mongoURI, {
      dbName: "share-prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
