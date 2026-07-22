import { MongoClient } from "mongodb";

const uri = (process.env.MONGODB_URI ?? process.env.mongodb)!;

const options = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  tlsAllowInvalidCertificates: true,
};

let clientPromise: Promise<MongoClient>;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = new MongoClient(uri, options).connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

export default clientPromise;
