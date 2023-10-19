import { createSlice } from "@reduxjs/toolkit";

import { Theme } from "../../consts/theme";
import { TypeGame } from "../../models/type-game";
import { GAME_TYPES } from "../../consts/type-game";

type InitialValue = {
    typeGame: TypeGame;
    countPlayer: number;
    theme: Theme;
};

const initialValue: InitialValue = {
    typeGame: GAME_TYPES[0],
    countPlayer: 2,
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

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { changeCountPlayers, changeTheme, changeTypeGame } =
    gameSlice.actions;

export default gameSlice.reducer;
