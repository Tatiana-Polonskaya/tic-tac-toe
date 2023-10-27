import MemoCell from "../cell";
import { cn } from "@bem-react/classname";
import "./style.scss";
import { useEffect, useState } from "react";
import { havingWinner, havingEmptyCell } from "../../consts/check-winner";
import { Labels } from "../../consts/labels";
import { GameStatus } from "../../consts/game-status";

type Props = {
    cells: number[];
    updateCells: (id: number) => boolean;
    gameStatus: GameStatus;
    changeGameStatus: (status: GameStatus) => void;
    countRowCol: number;
    currentPlayer: number;
    changePlayer: () => void;
};

const CN = cn("Field");

export default function Field({
    cells,
    updateCells,
    gameStatus,
    changeGameStatus,
    countRowCol,
    currentPlayer,
    changePlayer,
}: Props) {
    const [error, setError] = useState<string>();

    const handleCellClick = (id: number) => {
        if (gameStatus === GameStatus.Win || gameStatus === GameStatus.Draw)
            return;
        if (gameStatus === GameStatus.Start) changeGameStatus(GameStatus.Game);

        if (updateCells(id)) setError("");
        else setError("Эта ячейка уже занята!");
    };

    useEffect(() => {
        if (gameStatus !== GameStatus.Start) {
            const checking = havingWinner(
                currentPlayer + 1,
                cells,
                countRowCol
            );
            const checkEmpty = havingEmptyCell(Labels.Empty, cells);

            if (checking) {
                changeGameStatus(GameStatus.Win);
            } else if (!checkEmpty) {
                changeGameStatus(GameStatus.Draw);
            } else {
                changePlayer();
            }
        }
    }, [cells]);

    useEffect(() => {
        if (gameStatus === GameStatus.Start) setError("");
    }, [gameStatus]);

    return (
        <>
            <div
                className={CN("flex")}
                style={{ gridTemplateColumns: `repeat(${countRowCol}, 1fr)` }}>
                {cells.map((el, i) => (
                    <MemoCell
                        key={i}
                        id={i}
                        onClick={handleCellClick}
                        type={el}
                    />
                ))}
            </div>
            <p>{error}</p>
        </>
    );
}
