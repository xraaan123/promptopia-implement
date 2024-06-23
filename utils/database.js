import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  console.log("MONGODB_URI: ", process.env.MONGODB_URI);

  try {
    await mongoose.connect(process.env.MONGODB_URI.toString(), {
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
