import { Db } from "mongodb";
import { playerToPlayerEntity } from "../helpers/playerToPlayerEntity";
import { PlayerDB, PlayerEntity } from "../types/player";

export const getPlayerById = async (db: Db, id: string): Promise<PlayerEntity | null> => {
    const collection = db.collection<PlayerDB>('players');

    const player = await collection.findOne({ playerId: parseInt(id) });

    if (!player)
        return null
    return playerToPlayerEntity(player)
};
