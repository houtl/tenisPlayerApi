import { Db } from "mongodb";
import { playerToPlayerEntity } from "../helpers/playerToPlayerEntity";
import { PlayerDB, PlayerEntity } from "../types/player";

export const getPlayers = async (db: Db, skip: number = 0, limit: number = 100): Promise<PlayerEntity[]> => {
    const collection = db.collection<PlayerDB>('players');

    const players = await collection.find({}, { skip, limit }).toArray();

    return players.map(player => playerToPlayerEntity(player))
};
