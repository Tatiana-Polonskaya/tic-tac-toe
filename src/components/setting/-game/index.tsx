import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";

import { cn } from "@bem-react/classname";

import "./style.scss";
import { useTheme } from "../../../hook/useTheme";
import { MenuContext } from "../context";
import { RootState } from "../../../store/store";
import { COUNT_PLAYERS } from "../../../consts/players";
import { GAME_TYPES } from "../../../consts/type-game";
import { Theme, ThemeMode } from "../../../consts/theme";
import {
    changeCountPlayers,
    changeTheme,
    changeTypeGame,
} from "../../../store/type-game";
import ButtonRowGroup, { ButtonContent } from "../../button-row-group";
import { TypeButton } from "../../../consts/type-button";
import TableCell from "../-table-cell";
import { changePlayers } from "../../../store/player";
import { CosmosIndexLabels, getShapeById } from "../../../consts/labels";

const CN = cn("GameSetting");

export default function GameSetting() {
    const dispatch = useDispatch();
    const [updateTheme] = useTheme();

    const { onSave, goToBack } = useContext(MenuContext);

    /* ----------------------- COMPLEXITY GAME ----------------------- */
    const storeGame = useSelector((state: RootState) => state.game.typeGame);

    /* ----------------------- COUNT PLAYERS ----------------------- */

    const storeCountPlayers = useSelector(
        (state: RootState) => state.game.countPlayer
    );

    /* ----------------------- THEME ----------------------- */

    const storeTheme = useSelector((state: RootState) => state.game.theme);

    /* ----------------------- SAVING ----------------------- */
    const [menuState, setMenuState] = useState({
        countPlayers: storeCountPlayers,
        complexity: storeGame,
        theme: storeTheme,
    });

    const handleChangeCountPlayers = (index: number) => {
        setMenuState({ ...menuState, countPlayers: COUNT_PLAYERS[index] });
    };

    const handleChangeIndexType = (index: number) => {
        setMenuState({
            ...menuState,
            complexity: GAME_TYPES[index],
        });
    };

    const handleChangeMenuTheme = (index: number) => {
        setMenuState({ ...menuState, theme: Theme[index] });
    };

    const storePlayer = useSelector((state: RootState) => state.player.players);

    /** --------------------------- LABELS --------------------------- */

    const handleClicksave = () => {
        dispatch(changeTypeGame(menuState.complexity));
        dispatch(changeCountPlayers(menuState.countPlayers));
        dispatch(changeTheme(menuState.theme));
        if (menuState.theme.mode === ThemeMode.Cosmos) {
            const tempArr = storePlayer.map((el, i) => {
                return { ...el, label: getShapeById(CosmosIndexLabels[i]) };
            });
            dispatch(changePlayers(tempArr));
        }
        updateTheme(menuState.theme.mode);
        onSave();
    };

    const buttons: ButtonContent[] = [
        {
            id: 0,
            title: "Назад",
            typeButton: TypeButton.Red,
            onClick: goToBack,
        },
        {
            id: 1,
            title: "Сохранить",
            typeButton: TypeButton.Blue,
            onClick: handleClicksave,
        },
    ];

    return (
        <>
            <div className={CN("table")}>
                <TableCell
                    title={"Уровень сложности:"}
                    choices={GAME_TYPES.map((el) => el.title)}
                    initialNumber={storeGame.id}
                    onChangeValue={handleChangeIndexType}
                />
                <TableCell
                    title={"Количество игроков:"}
                    choices={COUNT_PLAYERS.map((el) => el.toString())}
                    initialNumber={COUNT_PLAYERS.indexOf(storeCountPlayers)}
                    onChangeValue={handleChangeCountPlayers}
                />
                <TableCell
                    title={"Тема оформления:"}
                    choices={Theme.map((el) => el.title)}
                    initialNumber={Theme.indexOf(storeTheme)}
                    onChangeValue={handleChangeMenuTheme}
                />
            </div>
            <ButtonRowGroup buttons={buttons} />
        </>
    );
}
