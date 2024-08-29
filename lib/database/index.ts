import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("Connected to MongoDb");
    return cached.conn;
  }

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "planit",
      bufferCommands: false,
    });

  cached.con = await cached.promise;
  console.log("Connected to MongoDb");
  return cached.conn;
};
