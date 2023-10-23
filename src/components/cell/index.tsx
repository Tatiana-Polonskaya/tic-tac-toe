import { cn } from "@bem-react/classname";
import "./style.scss";

import cross from "./assets/cross.svg";
import circle from "./assets/circle.svg";
import square from "./assets/rectangle.svg";
import triangle from "./assets/triangle.svg";
import { Labels } from "../../consts/labels";
import { ReactSVG } from "react-svg";

const CN = cn("Cell");

type Props = {
    type: Labels;
    onClick: () => void;
};

export default function Cell({ type, onClick }: Props) {
    const getImageByLabel = (type: Labels) =>
        type === Labels.Cross
            ? cross
            : type === Labels.Circle
            ? circle
            : type === Labels.Square
            ? square
            : triangle;

    return (
        <div className={CN("block")} onClick={onClick}>
            {type !== Labels.Empty && (
                <ReactSVG
                    src={getImageByLabel(type)}
                    className={CN("img", `color-player-${type - 1}`)}
                />
            )}
        </div>
    );
}
