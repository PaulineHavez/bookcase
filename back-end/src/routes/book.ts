import express from "express";
import BookService from "../entities/book";
import { Book } from "../entities/book";

const bookRouter = express.Router();
const bookService = new BookService();

bookRouter.get("/", async (_req, res) => {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

bookRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const book = await bookService.getBookById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

bookRouter.post("/", async (req, res) => {
  const book: Book = req.body;
  try {
    await bookService.createBook(book);
    res.status(201).json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

bookRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const book: Partial<Book> = req.body;
  try {
    await bookService.updateBook(id, book);
    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await bookService.deleteBook(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default bookRouter;
