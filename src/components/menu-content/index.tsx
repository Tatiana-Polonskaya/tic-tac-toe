import { cn } from "@bem-react/classname";
import "./style.scss";
import ButtonRowGroup, { ButtonContent, TypeButton } from "../button-row-group";
import ListWithArrows from "../list-with-arrows";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GAME_TYPES } from "../../consts/type-game";
import { changeCountPlayers, changeTypeGame } from "../../store/type-game";
import { useState } from "react";
import { COUNT_PLAYERS } from "../../consts/players";

type Props = {
    onClickCancel: () => void;
    onSave: () => void;
};

const CN = cn("MenuContent");

export default function MenuContent({ onClickCancel, onSave }: Props) {
    const storeGame = useSelector((state: RootState) => state.game.typeGame);
    const storeCountPlayers = useSelector(
        (state: RootState) => state.game.countPlayer
    );

    const storeTheme = useSelector((state: RootState) => state.game.theme);
    const dispatch = useDispatch();

    /* ----------------------- PARAM GAME TYPE----------------------- */
    const [currentIndexType, setCurrentIndexType] = useState(storeGame.id);
    const [currentCountPlayers, setCurrentCountPlayers] =
        useState(storeCountPlayers);

    const handleClicksave = () => {
        dispatch(changeTypeGame(GAME_TYPES[currentIndexType]));
        dispatch(changeCountPlayers(currentCountPlayers));

        onClickCancel();
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

    const choosenType = (type: number) => {
        if (type !== currentIndexType) {
            setCurrentIndexType(type);
        }
    };

    const choosenIndexCountPlayers = (index: number) => {
        const newCountPlayers = COUNT_PLAYERS[index];
        if (newCountPlayers !== currentCountPlayers) {
            setCurrentCountPlayers(newCountPlayers);
        }
    };

    return (
        <div className={CN()}>
            <div className={CN("logo")}>
                <img src="./logo.svg" alt="logo" className={CN("logo-img")} />
            </div>
            <div className={CN("table")}>
                <div className={CN("table-cell")}>Уровень сложности: </div>
                <div
                    className={CN("table-cell", {
                        border: currentIndexType !== storeGame.id,
                    })}>
                    <ListWithArrows
                        titles={GAME_TYPES.map((el) => el.title)}
                        initialNumber={currentIndexType}
                        setChoosenNumber={choosenType}
                    />
                </div>
                <div className={CN("table-cell")}>Количество игроков: </div>
                <div
                    className={CN("table-cell", {
                        border: currentCountPlayers !== storeCountPlayers,
                    })}>
                    <ListWithArrows
                        titles={COUNT_PLAYERS.map((el) => el.toString())}
                        initialNumber={COUNT_PLAYERS.indexOf(storeCountPlayers)}
                        setChoosenNumber={choosenIndexCountPlayers}
                    />
                </div>
                <div className={CN("table-cell")}>Тема оформления: </div>
                <div className={CN("table-cell")}>Классика</div>
            </div>
            <ButtonRowGroup buttons={buttons} />
        </div>
    );
}
