// lib/db.js
import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not defined");
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'todos',
   
  });

  isConnected = db.connections[0].readyState;
  console.log("✅ MongoDB connected");
};
