import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import client from "../database";

export interface Book {
  _id?: ObjectId;
  title: string;
  author: string;
  publicationDate: string;
  originalLanguage: string;
  typeId: string;
}

class BookService {
  private db: Db;
  private collection: Collection<Book>;

  constructor() {
    this.db = client.db("BooksNote");
    this.collection = this.db.collection<Book>("Book");
  }

  async getBooks(): Promise<Book[]> {
    return await this.collection.find({}).toArray();
  }

  async getBookById(id: string): Promise<Book | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async createBook(book: Book): Promise<void> {
    await this.collection.insertOne(book);
  }

  async updateBook(id: string, book: Partial<Book>): Promise<void> {
    await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: book });
  }

  async deleteBook(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export default BookService;
