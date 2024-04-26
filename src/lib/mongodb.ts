import mongoose from "mongoose";

const { MONGODB_URI_PRODUCTION } = process.env;

if (!MONGODB_URI_PRODUCTION) {
  throw new Error("Invalid enviroment variable: MONGODB_URI_PRODUCTION");
}

export const connectMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI_PRODUCTION);

    if (connection.readyState === 1) {
      console.log("Successfully Connected to DB");
      
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);

    return Promise.reject(error);
  }
};
