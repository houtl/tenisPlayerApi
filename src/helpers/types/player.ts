enum Sex {
    Male = 'M',
    Female = 'F'
}

interface Country {
    picture: string;
    code: string;
}

interface PlayerData {
    rank: number;
    points: number;
    weight: number;
    height: number;
    age: number;
    last: number[];
}

interface Player {
    firstname: string;
    lastname: string;
    shortname: string;
    sex: Sex;
    country: Country;
    picture: string;
    data: PlayerData;
}

interface PlayerEntity extends Player {
    id: number;
}

interface PlayerDB extends Player {
    _id: string;
    playerId: number;
}


interface PlayerModel {
    getPlayers: (skip: number, limit: number) => Promise<PlayerEntity[]>;
    getPlayerById: (id: string) => Promise<PlayerEntity | null>;
}