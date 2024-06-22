import express from "express";
import { connectToDatabase } from "../database";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use((_req, res) => {
  res.status(500).send("An unexpected error occurred.");
});

async function startServer() {
  try {
    const db = await connectToDatabase();
    app.locals.db = db;
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

startServer();
