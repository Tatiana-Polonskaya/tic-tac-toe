import { IPlayer } from "../models/players";
import { Labels } from "./labels";

export const PLAYERS: IPlayer[] = [
    {
        id: 0,
        label: Labels.Cross,
    },
    {
        id: 1,
        label: Labels.Circle,
    },
    {
        id: 2,
        label: Labels.Triangle,
    },
    {
        id: 3,
        label: Labels.Square,
    },
];

export const COUNT_PLAYERS = [2, 3, 4];
