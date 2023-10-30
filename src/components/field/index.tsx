import MemoCell from "../cell";
import { cn } from "@bem-react/classname";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { havingWinner, havingEmptyCell } from "../../consts/check-winner";
import { Labels } from "../../consts/labels";
import { GameStatus } from "../../consts/game-status";
import { PlayerContext } from "../../pages/main/context";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { PLAYERS } from "../../consts/players";

type Props = {
    gameStatus: GameStatus;
    changeGameStatus: (status: GameStatus) => void;
};

const CN = cn("Field");

export default function Field({ gameStatus, changeGameStatus }: Props) {
    const countRowCol = useSelector(
        (state: RootState) => state.game.typeGame
    ).mapSize;

    const [isError, setIsError] = useState(false);

    const { indexPlayer: currentPlayer, changePlayer } =
        useContext(PlayerContext);

    const [cells, setCells] = useState<number[]>([]);

    useEffect(() => {
        if (cells.length !== countRowCol ** 2) {
            setCells([...new Array(countRowCol ** 2).fill(0)]);
        }
    }, [countRowCol]);

    const updateCells = (id: number) => {
        const temp = [...cells];
        let res = true;
        if (temp[id] === Labels.Empty) {
            temp[id] = PLAYERS[currentPlayer].label;
            setCells(temp);
        } else {
            res = false;
        }
        return res;
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
        if (gameStatus === GameStatus.Start) {
            setCells([...new Array(countRowCol ** 2).fill(0)]);
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
                        id={i}
                        onClick={handleCellClick}
                        type={el}
                    />
                ))}
            </div>
            <div className={CN("error")}>
                {isError && "Эта ячейка уже занята!"}
            </div>
        </>
    );
}
