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

    const handleChangeCountPlayers = (index: number) => {
        setMenuState({ ...menuState, countPlayers: COUNT_PLAYERS[index] });
    };

    const handleChangeIndexType = (index: number) => {
        setMenuState({
            ...menuState,
            complexity: GAME_TYPES[index],
        });
    };

    const handleChangeTheme = (theme: number) => {
        setMenuState({ ...menuState, theme: theme });
    };

    const handleClicksave = () => {
        dispatch(changeTypeGame(menuState.complexity));
        dispatch(changeCountPlayers(menuState.countPlayers));
        dispatch(changeTheme(menuState.theme));

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
                <img src="./logo.svg" alt="logo" className={CN("logo-img")} />
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
                    choices={["Классика", "Ночь", "Космос"]}
                    initialNumber={storeTheme}
                    onChangeValue={handleChangeTheme}
                />
            </div>
            <ButtonRowGroup buttons={buttons} />
        </div>
    );
}
