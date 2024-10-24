import { client } from "../mongoConnection";
import { playerToPlayerEntity } from "../playerToPlayerEntity";

export const getPlayerById = async (id: string): Promise<PlayerEntity | null> => {
    const db = client.db('tenisu');

    const col = db.collection<PlayerDB>('players');
    console.log(id)

    //Insert a single document
    const player = await col.findOne({ playerId: parseInt(id) });
    console.log(player)

    if (!player)
        return null
    return playerToPlayerEntity(player)
};
