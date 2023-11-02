import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@bem-react/classname";

import { RootState } from "../../../store/store";
import { TypeButton } from "../../../consts/type-button";

import { MenuContext } from "../context";
import TableCell from "../../menu-content/-table-cell";
import ButtonRowGroup, { ButtonContent } from "../../button-row-group";
import { SHAPES } from "../../../consts/labels";

import "./style.scss";
import { changePlayers } from "../../../store/player";

const CN = cn("ShapesSetting");

export default function ShapesSetting() {
    /** --------------------------- CONST --------------------------- */
    const dispatch = useDispatch();
    const { onSave, goToBack } = useContext(MenuContext);

    const storePlayer = useSelector((state: RootState) => state.player.players);

    /** --------------------------- LABELS --------------------------- */

    const [players, setPlayers] = useState(storePlayer);

    const changeLabel = (indexShape: number, indexPlayer: number) => {
        console.log("player id: ", indexPlayer, "change: ", SHAPES[indexShape]);

        const tempArr = [...players];

        const temp = { ...tempArr[indexPlayer] };
        temp.label = SHAPES[indexShape];
        tempArr[indexPlayer] = temp;
        setPlayers(tempArr);
    };

    /** --------------------------- BUTTON --------------------------- */
    const handleClicksave = () => {
        dispatch(changePlayers(players));
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
        <div className={CN()}>
            <div className={CN("table")}>
                {storePlayer.map((player) => (
                    <TableCell
                        key={player.id}
                        title={`Игрок ${player.id + 1}:`}
                        choices={SHAPES.map((el) => el.title)}
                        initialNumber={player.id}
                        onChangeValue={changeLabel}
                    />
                ))}
            </div>
            <ButtonRowGroup buttons={buttons} />
        </div>
    );
}
