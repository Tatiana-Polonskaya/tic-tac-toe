import { useContext } from "react";
import { cn } from "@bem-react/classname";

import { TypeButton } from "../../../consts/type-button";
import { Labels } from "../../../consts/labels";
import { PLAYERS } from "../../../consts/players";

import { MenuContext } from "../context";
import TableCell from "../../menu-content/-table-cell";
import ButtonRowGroup, { ButtonContent } from "../../button-row-group";

import "./style.scss";

const CN = cn("ShapesSetting");

export const SHAPES = [
    {
        id: Labels.Cross,
        title: "Крест",
        link: "shapes/cross.svg",
    },
    {
        id: Labels.Circle,
        title: "Нуль",
        link: "shapes/cricle.svg",
    },
    {
        id: Labels.Triangle,
        title: "Треугольник",
        link: "shapes/triangle.svg",
    },
    {
        id: Labels.Square,
        title: "Квадрат",
        link: "shapes/rectangle.svg",
    },
];

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
            <div>
                <div className={CN("table")}>
                    {PLAYERS.map((player) => (
                        <TableCell
                            title={`Игрок ${player.id + 1}:`}
                            choices={SHAPES.map((el) => el.title)}
                            initialNumber={player.label - 1}
                            onChangeValue={changeLabel}
                        />
                    ))}
                </div>
                <ButtonRowGroup buttons={buttons} />
            </div>
        </div>
    );
}
