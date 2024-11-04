import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { getSecret } from "../secretManager";

jest.mock("@aws-sdk/client-secrets-manager");

describe("getSecret", () => {
    const mockGetSecretValue = jest.fn();
    const secretValue = JSON.stringify("the-secret-value");

    beforeAll(() => {
        (SecretsManagerClient.prototype.send as jest.Mock) = mockGetSecretValue;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return the secret value", async () => {
        mockGetSecretValue.mockResolvedValueOnce({
            SecretString: secretValue,
        });

        const result = await getSecret();

        expect(result).toBe(secretValue);
        expect(mockGetSecretValue).toHaveBeenCalled();
    });

    it("should return an empty string if SecretString is undefined", async () => {
        mockGetSecretValue.mockResolvedValueOnce({});

        const result = await getSecret();

        expect(result).toBe('');
    });

    it("should throw an error if the secret retrieval fails", async () => {
        const errorMessage = "Secret retrieval failed";
        mockGetSecretValue.mockRejectedValueOnce(new Error(errorMessage));

        await expect(getSecret()).rejects.toThrow(errorMessage);
    });
});