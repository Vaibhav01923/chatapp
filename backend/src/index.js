import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
  connectDB();
});
