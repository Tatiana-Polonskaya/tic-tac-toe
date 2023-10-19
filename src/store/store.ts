import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./type-game";

export default configureStore({
    reducer: {
        game: gameSlice,
    },
});
