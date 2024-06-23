import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  console.log(mongoose.connect);

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share-prompt",
      /*   useNewUrlParser: true,
      useUnifiedTopology: true, */
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
