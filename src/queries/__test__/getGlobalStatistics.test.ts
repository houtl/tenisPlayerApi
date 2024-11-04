import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, Db } from "mongodb";
import { getGlobalStatistics } from "../getGlobalStatistics";
import { Statistics } from "../../types/statistics";

describe("getGlobalStatistics", () => {
    let db: Db;
    let client: MongoClient;
    let mongoServer: MongoMemoryServer;

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

    beforeEach(async () => {
        const collection = db.collection("players");
        await collection.insertMany([
            {
                country: { code: "SRB" },
                data: { last: [1, 1, 1, 1, 1], weight: 80000, height: 185 },
            },
            {
                country: { code: "USA" },
                data: { last: [1, 0, 1, 1, 0], weight: 74000, height: 175 },
            },
            {
                country: { code: "ESP" },
                data: { last: [1, 1, 0, 0, 1], weight: 85000, height: 180 },
            },
        ]);
    });

    afterEach(async () => {
        await db.collection("players").deleteMany({});
    });

    it("should return correct global statistics", async () => {
        const result: Statistics = await getGlobalStatistics(db);

        expect(result.bestCountry).toBe("SRB");
        expect(result.bestCountryWinRatio).toBeCloseTo(1.0, 1);
        expect(result.averageBMI).toBeGreaterThan(22);
        expect(result.medianHeight).toBe(180);
    });
});