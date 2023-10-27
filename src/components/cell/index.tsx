import { cn } from "@bem-react/classname";
import "./style.scss";

import cross from "./assets/cross.svg";
import circle from "./assets/circle.svg";
import square from "./assets/rectangle.svg";
import triangle from "./assets/triangle.svg";
import { Labels } from "../../consts/labels";
import { ReactSVG } from "react-svg";
import { memo } from "react";

const CN = cn("Cell");

type Props = {
    id: number;
    type: Labels;
    onClick: (id: number) => void;
};

const MemoCell = memo(function Cell({ id, type, onClick }: Props) {
    const getImageByLabel = (type: Labels) =>
        type === Labels.Cross
            ? cross
            : type === Labels.Circle
            ? circle
            : type === Labels.Square
            ? square
            : triangle;

    return (
        <div className={CN("block")} onClick={() => onClick(id)}>
            {type !== Labels.Empty && (
                <ReactSVG
                    src={getImageByLabel(type)}
                    className={CN("img", `color-player-${type - 1}`)}
                />
            )}
        </div>
    );
});

export default MemoCell;
