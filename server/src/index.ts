import express from "express";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import { connectDatabase } from "./database/database.config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is listening on port: ${PORT}`);
});
