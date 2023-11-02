import { createSlice } from "@reduxjs/toolkit";

import { IPlayer } from "../../models/players";
import { PLAYERS } from "../../consts/players";

type InitialValue = {
    players: IPlayer[];
};

const initialValue: InitialValue = {
    players: PLAYERS,
};

export const playerSlice = createSlice({
    name: "player",
    initialState: initialValue,
    reducers: {
        changePlayers: (state, action) => {
            state.players = action.payload;
        },
    },
});

export const { changePlayers } = playerSlice.actions;

export default playerSlice.reducer;
