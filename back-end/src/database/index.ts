import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString: string = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    return client.db("sample_training");
  } catch (e) {
    console.error("Error when connecting to MongoDB Atlas:", e);
    throw e;
  }
}

export default client;
