import { MongoClient } from 'mongodb';

// Connection URL
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.MONGODB_DB || 'projectPersonalWebsite';

export function connectToDatabase() {
  const getConnectedDb = async () => {
    await client.connect();
    return client.db(dbName)
  }

  return [getConnectedDb, client] as const;
}
