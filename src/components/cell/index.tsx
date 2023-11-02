import { ReactSVG } from "react-svg";
import { memo } from "react";

import { cn } from "@bem-react/classname";

import { IPlayer } from "../../models/players";

import "./style.scss";

const CN = cn("Cell");

type Props = {
    player: IPlayer;
    onClick: () => void;
};

const MemoCell = memo(function Cell({ player, onClick }: Props) {
    return (
        <div className={CN("block")} onClick={onClick}>
            {player && (
                <ReactSVG
                    src={player.label.link}
                    className={CN("img", `color-player-${player.id}`)}
                />
            )}
        </div>
    );
});

export default MemoCell;
