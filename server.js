import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import path from "path";

import { fileURLToPath } from "url";

// import authRoutes from "./routes/auth.js";
// import contentRoutes from "./routes/content.js";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname,".env")});
// console.log("ENV KEYS LOADED:", Object.keys(process.env));
// console.log("MONGO_URI VALUE:", process.env.MONGO_URI);


// console.log("MONGO_URI:", process.env.MONGO_URI); // 👈 should now print your URI


const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Random Media API is live" });
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
   .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
