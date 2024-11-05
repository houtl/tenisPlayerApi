import request from 'supertest';
import { getPlayerById } from '../queries/getPlayerById';
import { getGlobalStatistics } from '../queries/getGlobalStatistics';
import { getPlayers } from '../queries/getPlayers';
import { app } from '..';

jest.mock('../queries/getPlayers');
jest.mock('../queries/getPlayerById');
jest.mock('../queries/getGlobalStatistics');

describe('API tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle errors in getting players', async () => {
        (getPlayers as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app).get('/players?skip=0&limit=100');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ "message": "failed to get players" });
    });

    it('should handle errors in getting player by id', async () => {
        (getPlayerById as jest.Mock).mockRejectedValue(new Error('Player not found'));

        const response = await request(app).get('/player/1');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ "message": "failed to get player by id 1" });
    });

    it('should handle errors in getting statistics', async () => {
        (getGlobalStatistics as jest.Mock).mockRejectedValue(new Error('Statistics error'));

        const response = await request(app).get('/statistics');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ "message": "failed to get global statistics" });
    });

    it('should get players', async () => {
        const mockPlayers = [{ playerId: 1, name: 'Player One' }];
        (getPlayers as jest.Mock).mockResolvedValue(mockPlayers);

        const response = await request(app).get('/players?skip=0&limit=100');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPlayers);
    });

    it('should get player by id', async () => {
        const mockPlayer = { playerId: 1, name: 'Player One' };
        (getPlayerById as jest.Mock).mockResolvedValue(mockPlayer);

        const response = await request(app).get('/player/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPlayer);
    });

    it('should get global statistics', async () => {
        const mockStatistics = { bestCountry: 'USA', bestCountryWinRatio: 0.75 };
        (getGlobalStatistics as jest.Mock).mockResolvedValue(mockStatistics);

        const response = await request(app).get('/statistics');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockStatistics);
    });
});