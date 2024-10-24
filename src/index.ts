import express from 'express';
import { getPlayers } from './helpers/queries/getPlayers';
import { getPlayerById } from './helpers/queries/getPlayerById';

const PORT = process.env.PORT || 3000;
const app = express();

//get 100 players
app.get('/players', async (req, res) => {
    const { skip, limit } = req.query as { skip: string, limit: string };

    try {
        const players = await getPlayers(Number(skip), Number(limit));
        res.json(players);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get player by id
app.get('/player/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const player = await getPlayerById(id);
        res.json(player);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get globle statistiques
app.get('/statistiques', async (_req, res) => {
    try {
        const statistiques = await getStatistiques();
        res.json(statistiques);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});