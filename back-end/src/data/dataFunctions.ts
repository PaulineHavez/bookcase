import client from "../database";

export async function getAllTypes() {
  try {
    await client.connect();
    const db = client.db("BooksNote");
    const types = await db.collection("Type").find({}).toArray();
    return types;
  } catch (error) {
    console.error("Error when recovering types :", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function getAllBooks() {
  try {
    await client.connect();
    const db = client.db("BooksNote");
    const books = await db.collection("Book").find({}).toArray();
    return books;
  } catch (error) {
    console.error("Error when recovering books :", error);
    throw error;
  } finally {
    await client.close();
  }
}
