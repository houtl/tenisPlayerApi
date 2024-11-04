import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, Db } from "mongodb";
import { getPlayers } from "../getPlayers";
import { PlayerEntity, Sex } from "../../types/player";


describe("getPlayers", () => {
    let db: Db;
    let client: MongoClient;
    let mongoServer: MongoMemoryServer;

    const players = [
        {
            playerId: 1,
            firstname: "Novak",
            lastname: "Djokovic",
            shortname: "N.DJO",
            sex: Sex.Male,
            country: { code: "SRB", picture: "country_image_url" },
            picture: "player_image_url",
            data: {
                rank: 1,
                points: 2542,
                weight: 80000,
                height: 188,
                age: 34,
                last: [1, 1, 0, 1, 1]
            }
        },
        {
            playerId: 2,
            firstname: "Serena",
            lastname: "Williams",
            shortname: "S.WIL",
            sex: Sex.Female,
            country: { code: "USA", picture: "country_image_url" },
            picture: "player_image_url",
            data: {
                rank: 2,
                points: 3521,
                weight: 72000,
                height: 175,
                age: 39,
                last: [1, 0, 1, 0, 1]
            }
        }
    ]

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        client = new MongoClient(mongoServer.getUri());
        await client.connect();
        db = client.db("testDB");
    }, 10000);

    afterAll(async () => {
        await client.close();
        await mongoServer.stop();
    });

    it("should return null if player is not found", async () => {
        const result = await getPlayers(db);
        expect(result).toEqual([]);
    });

    it("should return a list of transformed players", async () => {
        const collection = db.collection("players");
        await collection.insertMany(players);

        const playersDb: PlayerEntity[] = await getPlayers(db, 0, 2);

        expect(playersDb).toHaveLength(2);
        expect(playersDb[0].id).toEqual(players[0].playerId);
        expect(playersDb[1].id).toEqual(players[1].playerId);

        await db.collection("players").deleteMany({});
    });


});