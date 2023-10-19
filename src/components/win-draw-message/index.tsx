import ButtonRowGroup, { ButtonContent, TypeButton } from "../button-row-group";

import { cn } from "@bem-react/classname";
import "./style.scss";
import { players } from "../../consts/players";

type Props = {
    isWin: boolean;
    indexPlayer: number;
    onClickReset: () => void;
    onClickShowMenu: () => void;
};

const CN = cn("WinDrawMessage");

export default function WinDrawMessage({
    isWin,
    indexPlayer,
    onClickReset,
    onClickShowMenu,
}: Props) {
    const messageDraw = "К сожалению, вышла ничья!";
    const messageWin = (
        <span>
            Победил
            <span style={{ color: players[indexPlayer].color, padding: "5px" }}>
                игрок №{indexPlayer + 1}
            </span>
            !
        </span>
    );

    const background = isWin ? `url("/win-background.png")` : "";

    const buttons: ButtonContent[] = [
        {
            id: 0,
            title: "В меню",
            typeButton: TypeButton.Red,
            onClick: onClickShowMenu,
        },
        {
            id: 1,
            title: "Заново",
            typeButton: TypeButton.Blue,
            onClick: onClickReset,
        },
    ];

    return (
        <div className={CN()} style={{ backgroundImage: background }}>
            <div className={CN("title")}>
                {isWin ? messageWin : messageDraw}
            </div>
            <ButtonRowGroup buttons={buttons} />
        </div>
    );
}
