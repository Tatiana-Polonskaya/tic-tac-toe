import { createContext } from "react";
import { PLAYERS } from "../../consts/players";

export const PlayerContext = createContext({
    currentPlayer: PLAYERS[0],
    changePlayer: () => {},
});
