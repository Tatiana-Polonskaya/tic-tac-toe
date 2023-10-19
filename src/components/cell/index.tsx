import { cn } from "@bem-react/classname";
import "./style.scss";

import cross from "./cross.svg";
import circle from "./circle-1.svg";
import { Labels } from "../../consts/labels";

const CN = cn("Cell");

type Props = {
    type?: Labels;
    onClick: () => void;
};

const getImage = (type: Labels | undefined) => {
    switch (type) {
        case Labels.Cross:
            return <img src={cross} className={CN("img")} />;
        case Labels.Circle:
            return <img src={circle} className={CN("img")} />;
        default:
            return undefined;
    }
};

export default function Cell({ type, onClick }: Props) {
    return (
        <div className={CN("block")} onClick={onClick}>
            {getImage(type)}
        </div>
    );
}
