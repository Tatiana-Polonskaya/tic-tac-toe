import { TypeGame } from "../models/type-game";

export enum MapSize {
    Easy = 3,
    Medium = 4,
    Hard = 5,
}

export const GAME_TYPES: TypeGame[] = [
    {
        id: 0,
        title: "Легко",
        mapSize: MapSize.Easy,
    },
    {
        id: 1,
        title: "Средне",
        mapSize: MapSize.Medium,
    },
    {
        id: 2,
        title: "Сложно",
        mapSize: MapSize.Hard,
    },
];
