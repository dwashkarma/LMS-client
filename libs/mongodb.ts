import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOA_URL as string);
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
  }
};
