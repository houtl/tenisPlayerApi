import { PlayerDB, PlayerEntity } from "../types/player";

export const playerToPlayerEntity = (player: PlayerDB): PlayerEntity => {
    const playerEntity: PlayerEntity = {
        id: player.playerId,
        ...player
    }

    if ('_id' in playerEntity) {
        delete playerEntity._id;
    }

    if ('playerId' in playerEntity) {
        delete playerEntity.playerId;
    }

    return playerEntity as PlayerEntity;
} 