import express from 'express';
import { getPlayers } from './queries/getPlayers';
import { getPlayerById } from './queries/getPlayerById';
import { getGlobalStatistics } from './queries/getGlobalStatistics';
import { db } from "./mongoConnection";

const PORT = process.env.PORT || 3000;
export const app = express();

//get 100 players
app.get('/players', async (req, res) => {
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 100;


    try {
        const players = await getPlayers(db, Number(skip), Number(limit));
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `failed to get players` });
    }
});

//get player by id
app.get('/player/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const player = await getPlayerById(db, id);
        if (!player) {
            throw new Error(`Player with id ${req.params.id} not found`);
        }
        res.json(player);
    } catch (error) {
        console.error(`Error fetching player by id ${req.params.id}:`, error);
        res.status(500).json({ message: `failed to get player by id ${id}` });
    }
});

//get globle statistiques
app.get('/statistics', async (_req, res) => {
    try {
        const statistiques = await getGlobalStatistics(db);
        res.json(statistiques);
    } catch (error) {
        console.error("Failed to retrieve global statistics:", error);
        res.status(500).json({ message: `failed to get global statistics` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});