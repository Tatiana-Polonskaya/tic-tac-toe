import { cn } from "@bem-react/classname";
import "./style.scss";
import ButtonRowGroup, { ButtonContent, TypeButton } from "../button-row-group";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GAME_TYPES } from "../../consts/type-game";
import { useState } from "react";
import { COUNT_PLAYERS } from "../../consts/players";
import TableCell from "./-table-cell";
import {
    changeCountPlayers,
    changeTheme,
    changeTypeGame,
} from "../../store/type-game";
import { Theme } from "../../consts/theme";
import { useTheme } from "../../hook/useTheme";
import { ReactSVG } from "react-svg";

type Props = {
    onClickCancel: () => void;
    onSave: () => void;
};

const CN = cn("MenuContent");

export default function MenuContent({ onClickCancel, onSave }: Props) {
    const dispatch = useDispatch();

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

    const [updateTheme] = useTheme();

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

    const handleClicksave = () => {
        dispatch(changeTypeGame(menuState.complexity));
        dispatch(changeCountPlayers(menuState.countPlayers));
        dispatch(changeTheme(menuState.theme));
        updateTheme(menuState.theme.mode);

        onSave();
    };

    const buttons: ButtonContent[] = [
        {
            id: 0,
            title: "Отмена",
            typeButton: TypeButton.Red,
            onClick: onClickCancel,
        },
        {
            id: 1,
            title: "Сохранить",
            typeButton: TypeButton.Blue,
            onClick: handleClicksave,
        },
    ];

    return (
        <div className={CN()}>
            <div className={CN("logo")}>
                <ReactSVG src={"./logo.svg"} className={CN("logo-img")} />
            </div>
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
        </div>
    );
}
