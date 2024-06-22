import express from "express";
import client from "../database";

const bookRouter = express.Router();

bookRouter.get("/", async (_req, res) => {
  try {
    const db = client.db("BooksNote");
    const books = await db.collection("Book").find({}).toArray();
    res.json(books);
  } catch (error) {
    console.error("Error when retrieving books :", error);
    res.status(500).json({ error: "Error when retrieving books" });
  }
});

bookRouter.get("/:typeId", async (req, res) => {
  const typeId = req.params.typeId;
  try {
    const db = client.db("BooksNote");
    const books = await db.collection("Book").find({ typeId }).toArray();
    res.json(books);
  } catch (error) {
    console.error("Error when retrieving books :", error);
    res.status(500).json({ error: "Error when retrieving books" });
  }
});

export default bookRouter;
