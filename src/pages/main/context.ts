import { createContext } from "react";

export const PlayerContext = createContext({
    indexPlayer: 0,
    changePlayer: () => {},
});
