import * as mongoDB from "mongodb";
import { getSecret } from "./secretManager";

export let db: mongoDB.Db;

export const initDB = async (): Promise<mongoDB.MongoClient> => {
    let connectionString: string = 'mongodb://localhost:27017';
    let config = {}

    if (process.env.NODE_ENV === 'production') {
        connectionString = await getSecret();
        config = {
            tlsCAFile: '~/global-bundle.pem',
        }
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString, config);
    await client.connect();
    return client;
};

initDB().then((dbClient) => {
    db = dbClient.db('tenisu');
}).catch((error) => {
    console.error('Failed to initialize database:', error);
});