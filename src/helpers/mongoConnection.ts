import * as mongoDB from "mongodb";
import { getSecret } from "./secretManager";

export let client: mongoDB.MongoClient;

const initDB = async () => {
    let connectionString: string = 'mongodb://localhost:27017';

    if (process.env.NODE_ENV === 'production') {
        connectionString = await getSecret();
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
    await client.connect();
    return client;
};

initDB().then((dbClient) => {
    client = dbClient;
}).catch((error) => {
    console.error('Failed to initialize database:', error);
});