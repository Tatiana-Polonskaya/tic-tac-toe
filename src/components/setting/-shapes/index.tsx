import { useContext } from "react";
import { cn } from "@bem-react/classname";

import { TypeButton } from "../../../consts/type-button";

import { PLAYERS } from "../../../consts/players";

import { MenuContext } from "../context";
import TableCell from "../../menu-content/-table-cell";
import ButtonRowGroup, { ButtonContent } from "../../button-row-group";

import "./style.scss";
import { SHAPES } from "../../../consts/labels";

const CN = cn("ShapesSetting");

export default function ShapesSetting() {
    const { goToBack } = useContext(MenuContext);

    const handleClicksave = () => {
        goToBack();
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

    const changeLabel = (index: number) => {
        console.log("change: ", SHAPES[index]);
    };

    return (
        <div className={CN()}>
            <div className={CN("table")}>
                {PLAYERS.map((player) => (
                    <TableCell
                        title={`Игрок ${player.id + 1}:`}
                        choices={SHAPES.map((el) => el.title)}
                        initialNumber={player.label.id - 1}
                        onChangeValue={changeLabel}
                    />
                ))}
            </div>
            <ButtonRowGroup buttons={buttons} />
        </div>
    );
}
