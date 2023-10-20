import { IPlayer } from "../models/players";
import { Labels } from "./labels";

export const PLAYERS: IPlayer[] = [
    {
        id: 0,
        label: Labels.Cross,
        color: "#C84141",
        backgroundColor:
            "linear-gradient(90deg, #EA4E4E 0%, rgba(234, 78, 78, 0.47) 46.88%, rgba(234, 78, 78, 0.00) 100%)",
    },
    {
        id: 1,
        label: Labels.Circle,
        color: "#553FD7",
        backgroundColor:
            "linear-gradient(270deg, #553FD7 0.06%, rgba(82, 60, 215, 0.51) 49.48%, rgba(110, 88, 245, 0.00) 99.95%)",
    },
    {
        id: 2,
        label: Labels.Triangle,
        color: "#368E28",
        backgroundColor:
            "linear-gradient(180deg, #64EA4E 0%, rgba(100, 234, 78, 0.00) 100%)",
    },
    {
        id: 3,
        label: Labels.Square,
        color: "#EADA4E",
        backgroundColor:
            "linear-gradient(0deg, #EADA4E 0%, rgba(234, 218, 78, 0.00) 100%)",
    },
];

export const COUNT_PLAYERS = [2, 3, 4];
