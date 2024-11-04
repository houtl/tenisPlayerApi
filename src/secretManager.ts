import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

const secret_name = 'DB_CONN_STRING';

const secretsClient = new SecretsManagerClient({
    region: 'eu-west-1',
});

export const getSecret = async (): Promise<string> => {
    let response;
    try {
        response = await secretsClient.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
    } catch (error) {
        throw error;
    }

    return response.SecretString || '';
};
