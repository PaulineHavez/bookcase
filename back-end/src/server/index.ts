import express from "express";
import { ErrorRequestHandler } from "express";
import { connectToDatabase } from "../database";
import dotenv from "dotenv";
import cors from "cors";
import bookRouter from "../routes/book";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("An unexpected error occurred.");
};
app.use(errorHandler);

app.use("/books", bookRouter);

async function startServer() {
  try {
    const db = await connectToDatabase();
    app.locals.db = db;
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error when starting the server:", error);
    process.exit(1);
  }
}

startServer();

export default app;
