import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";

import authRoutes from "./routes/auth.routes";
import componentsRoutes from "./routes/components.routes";
import adminRoutes from "./routes/admin.routes";
import leaderboardRoutes from "./routes/leaderboard.routes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/components", componentsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("OpenUI API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
