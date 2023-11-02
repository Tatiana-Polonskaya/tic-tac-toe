import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "@bem-react/classname";

import { RootState } from "../../store/store";

import MemoCell from "../cell";
import { PlayerContext } from "../../pages/main/context";

import { Labels } from "../../consts/labels";
import { GameStatus } from "../../consts/game-status";
import { PLAYERS } from "../../consts/players";
import { havingWinner, havingEmptyCell } from "../../consts/check-winner";

import "./style.scss";

type Props = {
    gameStatus: GameStatus;
    changeGameStatus: (status: GameStatus) => void;
};

const CN = cn("Field");

export default function Field({ gameStatus, changeGameStatus }: Props) {
    //
    /* ------------------------ COUNT ROW AND COL ------------------------ */
    const countRowCol = useSelector(
        (state: RootState) => state.game.typeGame
    ).mapSize;

    /* ------------------------ ERROR MESSAGE ------------------------ */

    const [isError, setIsError] = useState(false);

    /* ------------------------ PLAYER ------------------------ */
    const { currentPlayer, changePlayer } = useContext(PlayerContext);

    /* ------------------------ CELLS ------------------------ */
    const [cells, setCells] = useState<number[]>([]);

    const clearCells = () => {
        setCells([...new Array(countRowCol ** 2).fill(-1)]);
    };

    useEffect(() => {
        if (cells.length !== countRowCol ** 2) {
            clearCells();
        }
    }, [countRowCol]);

    const updateCells = (id: number) => {
        const temp = [...cells];

        if (temp[id] === Labels.Empty) {
            temp[id] = currentPlayer.id;
            setCells(temp);
            return true;
        }
        return false;
    };

    const handleCellClick = (id: number) => {
        if (gameStatus === GameStatus.Win || gameStatus === GameStatus.Draw)
            return;
        if (gameStatus === GameStatus.Start) changeGameStatus(GameStatus.Game);

        setIsError(!updateCells(id));
    };

    useEffect(() => {
        if (gameStatus !== GameStatus.Start) {
            const checking = havingWinner(
                currentPlayer.label.id,
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
        if (gameStatus === GameStatus.Start) {
            clearCells();
            setIsError(false);
        }
    }, [gameStatus]);

    return (
        <>
            <div
                className={CN("flex")}
                style={{
                    gridTemplateColumns: `repeat(${countRowCol}, 1fr)`,
                    gridTemplateRows: `repeat(${countRowCol}, 1fr`,
                }}>
                {cells.map((el, i) => (
                    <MemoCell
                        key={i}
                        onClick={() => handleCellClick(i)}
                        player={PLAYERS[el]}
                    />
                ))}
            </div>
            <div className={CN("error")}>
                {isError && "Эта ячейка уже занята!"}
            </div>
        </>
    );
}
