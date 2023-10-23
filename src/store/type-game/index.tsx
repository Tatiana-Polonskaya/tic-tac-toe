import { createSlice } from "@reduxjs/toolkit";

import { Theme } from "../../consts/theme";
import { TypeGame } from "../../models/type-game";
import { GAME_TYPES } from "../../consts/type-game";
import { COUNT_PLAYERS } from "../../consts/players";

type InitialValue = {
    typeGame: TypeGame;
    countPlayer: number;
    theme: Theme;
};

const initialValue: InitialValue = {
    typeGame: GAME_TYPES[0],
    countPlayer: COUNT_PLAYERS[0],
    theme: Theme.Light,
};

export const gameSlice = createSlice({
    name: "game",
    initialState: initialValue,
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload;
        },
        changeCountPlayers: (state, action) => {
            state.countPlayer = action.payload;
        },
        changeTypeGame: (state, action) => {
            state.typeGame = action.payload;
        },
    },
});

export const { changeCountPlayers, changeTheme, changeTypeGame } =
    gameSlice.actions;

export default gameSlice.reducer;
