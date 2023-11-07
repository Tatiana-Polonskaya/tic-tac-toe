import ButtonRowGroup, { ButtonContent } from "../button-row-group";

import { cn } from "@bem-react/classname";
import "./style.scss";
import { TypeButton } from "../../consts/type-button";

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
            <span className={CN("user", `color-player-${indexPlayer}`)}>
                игрок №{indexPlayer + 1}
            </span>
            !
        </span>
    );

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
        <div className={CN({ background: isWin })}>
            <div className={CN("title")}>
                {isWin ? messageWin : messageDraw}
            </div>
            <ButtonRowGroup buttons={buttons} />
        </div>
    );
}
