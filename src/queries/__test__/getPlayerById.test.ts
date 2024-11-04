import { MongoClient, Db } from "mongodb";
import { getPlayerById } from "../getPlayerById";
import { PlayerDB, Sex } from "../../types/player";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("getPlayerById", () => {
    let mongoServer: MongoMemoryServer;
    let client: MongoClient;
    let db: Db;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        client = new MongoClient(uri);
        await client.connect();
        db = client.db();
    }, 10000);

    afterAll(async () => {
        await client.close();
        await mongoServer.stop();
    });

    it("should return a player by ID", async () => {
        const mockPlayer: PlayerDB = {
            _id: "xxx",
            playerId: 1,
            firstname: "Novak",
            lastname: "Djokovic",
            shortname: "N.DJO",
            sex: Sex.Male,
            country: {
                picture: "url/to/serbia-flag.png",
                code: "SRB"
            },
            picture: "url/to/player-picture.png",
            data: {
                rank: 2,
                points: 2542,
                weight: 80000,
                height: 188,
                age: 31,
                last: [1, 1, 1, 1, 1]
            }
        };

        const collection = db.collection<PlayerDB>("players");
        await collection.insertOne(mockPlayer);

        const result = await getPlayerById(db, "1");

        expect(result).toBeTruthy();
        expect(result?.firstname).toBe("Novak");
        expect(result?.lastname).toBe("Djokovic");
    });

    it("should return null if player is not found", async () => {
        const result = await getPlayerById(db, "999");
        expect(result).toBeNull();
    });
});
