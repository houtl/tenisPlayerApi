import * as mongoDB from "mongodb";
import { getSecret } from "./secretManager";

export let db: mongoDB.Db;

export const initDB = async (): Promise<mongoDB.MongoClient> => {
    let connectionString: string = 'mongodb://localhost:27017';

    if (process.env.NODE_ENV === 'production') {
        connectionString = await getSecret();
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
    await client.connect();
    return client;
};

initDB().then((dbClient) => {
    db = dbClient.db('tenisu');
}).catch((error) => {
    console.error('Failed to initialize database:', error);
});