import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import thoughtRoutes from "./routes/thoughtRoutes";

const app = express();
const PORT = 3001;

mongoose.connect("mongodb://127.0.0.1:27017/socialNetworkDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
