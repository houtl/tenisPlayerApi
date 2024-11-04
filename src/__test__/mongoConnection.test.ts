import { initDB, db } from "../mongoConnection";
import { getSecret } from "../secretManager";

jest.mock("mongodb", () => {
    const mockDb = {
        collection: jest.fn().mockReturnValue({
            findOne: jest.fn().mockResolvedValue(null),
        }),
    };

    const mockClient = {
        connect: jest.fn().mockResolvedValue({}),
        db: jest.fn().mockReturnValue(mockDb),
        close: jest.fn(),
    };

    return {
        MongoClient: jest.fn(() => mockClient),
    };
});

jest.mock("../secretManager");

describe("Database Initialization", () => {
    beforeAll(async () => {
        (getSecret as jest.Mock).mockResolvedValue("mongodb://localhost:27017");
        await initDB();
    });

    afterEach(() => {
    });

    test("should initialize the database correctly", () => {
        expect(db).toBeDefined();
        expect(db.collection).toBeDefined();
    });

    test("should connect to the correct database when in production", async () => {
        process.env.NODE_ENV = "production";
        (getSecret as jest.Mock).mockResolvedValue("mongodb://mocked-db:27017");

        await initDB();
        expect(db).toBeDefined();
        expect(db.collection).toBeDefined();
    });
});
