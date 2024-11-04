import express from 'express';
import { getPlayers } from './queries/getPlayers';
import { getPlayerById } from './queries/getPlayerById';
import { getGlobalStatistics } from './queries/getGlobalStatistics';
import { db } from "./mongoConnection";

const PORT = process.env.PORT || 3000;
export const app = express();

//get 100 players
app.get('/players', async (req, res) => {
    const { skip, limit } = req.query as { skip: string, limit: string };

    try {
        const players = await getPlayers(db, Number(skip), Number(limit));
        res.json(players);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get player by id
app.get('/player/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const player = await getPlayerById(db, id);
        res.json(player);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get globle statistiques
app.get('/statistics', async (_req, res) => {
    try {
        const statistiques = await getGlobalStatistics(db);
        res.json(statistiques);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});