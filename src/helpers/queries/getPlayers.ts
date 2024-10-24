import { client } from "../mongoConnection";
import { playerToPlayerEntity } from "../playerToPlayerEntity";

export const getPlayers = async (skip: number = 0, limit: number = 100): Promise<PlayerEntity[]> => {
    const db = client.db('tenisu');

    const col = db.collection<PlayerDB>('players');

    const players = await col.find({}, { skip, limit, }).toArray();

    return players.map(player => playerToPlayerEntity(player))
};
