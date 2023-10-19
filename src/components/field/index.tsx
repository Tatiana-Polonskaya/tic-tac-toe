import Cell from "../cell";
import { cn } from "@bem-react/classname";
import "./style.scss";
import { useEffect, useState } from "react";
import { TypeGame } from "../../consts/type-game";
import { checkMapWinning, havingCountEmpty } from "../../consts/check-winner";
import { Labels } from "../../consts/labels";

type Props = {
    currentPlayer: number;
    changePlayer: () => void;
};

const CN = cn("Field");

export default function Field({ currentPlayer, changePlayer }: Props) {
    const currentType = TypeGame.Junior;
    const [isEnd, setisEnd] = useState(false);
    const [isStart, setisStart] = useState(true);

    const [cells, setCells] = useState([
        ...new Array(currentType * currentType).fill(0),
    ]);

    const [error, setError] = useState<string>();

    const handleCellClick = (id: number) => {
        if (isEnd) return;
        if (isStart) setisStart(false);
        const temp = [...cells];
        if (temp[id] === Labels.Empty) {
            temp[id] = currentPlayer + 1;
            setCells(temp);

            setError("");
        } else {
            setError("Эта ячейка уже занята, выберите другую!");
        }
    };

    useEffect(() => {
        if (!isStart) {
            const checking = checkMapWinning(
                currentPlayer + 1,
                cells,
                currentType
            );
            const checkEmpty = havingCountEmpty(Labels.Empty, cells);

            if (checking) {
                setError(`Выиграл игрок № ${currentPlayer + 1} `);
                setisEnd((prev) => !prev);
            } else if (!checkEmpty) {
                setError(`Игра закончена ничьей!`);
                setisEnd((prev) => !prev);
            } else {
                changePlayer();
            }
        }
    }, [cells]);

    const handleButtonClick = () => {
        setisEnd((prev) => !prev);
        setCells([...new Array(currentType ** 2).fill(0)]);
        changePlayer();
        setError("");
        setisStart(true);
    };

    return (
        <>
            <button onClick={handleButtonClick}>Заново</button>
            <div
                className={CN("flex")}
                style={{ gridTemplateColumns: `repeat(${currentType}, 1fr)` }}
            >
                {cells.map((el, i) => (
                    <Cell
                        key={i}
                        onClick={() => handleCellClick(i)}
                        type={el}
                    />
                ))}
            </div>
            {error && <p>{error}</p>}
        </>
    );
}
