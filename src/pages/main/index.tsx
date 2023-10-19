import { useEffect, useState } from "react";
import Field from "../../components/field";
import { cn } from "@bem-react/classname";
import "./style.scss";
import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { players } from "../../consts/players";
import { TypeGame } from "../../consts/type-game";
import { Labels } from "../../consts/labels";
import { GameStatus } from "../../consts/game-status";
import WinDrawMessage from "../../components/win-draw-message";
import MenuContent from "../../components/menu-content";

const CN = cn("MainPage");

export default function MainPage() {
    /* ------------------------ PLAYER ------------------------ */
    const [indexPlayer, setIndexPlayer] = useState(0);

    const changePlayer = () => {
        setIndexPlayer(
            indexPlayer === players.length - 1 ? 0 : indexPlayer + 1
        );
    };

    /* ------------------------ CELLS ------------------------ */

    const currentType = TypeGame.Junior;

    const [cells, setCells] = useState([
        ...new Array(currentType * currentType).fill(0),
    ]);

    const updateCells = (id: number) => {
        const temp = [...cells];
        let res = true;
        if (temp[id] === Labels.Empty) {
            temp[id] = indexPlayer + 1;
            setCells(temp);
        } else {
            res = false;
        }
        return res;
    };

    /* ------------------------ STATUS ------------------------ */

    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Start);

    const updateGameStatus = (status: GameStatus) => {
        setGameStatus(status);
    };

    const handleResetClick = () => {
        updateGameStatus(GameStatus.Start);
        setCells([...new Array(currentType ** 2).fill(0)]);
        changePlayer();
    };

    /* ------------------------ MODAL ------------------------ */

    const [isModal, setIsModal] = useState(false);
    const [isMenuModal, setIsMenuModal] = useState(false);

    const handleClose = () => {
        setIsModal(false);
    };

    const handleCloseMenu = () => {
        setIsMenuModal(false);
    };

    const handleModalReset = () => {
        handleClose();
        handleResetClick();
    };

    const handleModalToMenu = () => {
        handleClose();
        setIsMenuModal(true);
    };

    useEffect(() => {
        if (gameStatus === GameStatus.Win || gameStatus === GameStatus.Draw)
            setIsModal(true);
    }, [gameStatus]);

    return (
        <div
            className={CN("column")}
            style={{
                background: players[indexPlayer].backgroundColor,
            }}>
            <div className={CN("row")}>
                <Button onClick={() => setIsMenuModal(true)} styleClass="">
                    <span style={{ color: players[indexPlayer].color }}>
                        Меню
                    </span>
                </Button>
                <Button onClick={handleResetClick} styleClass="">
                    <span style={{ color: players[indexPlayer].color }}>
                        Заново
                    </span>
                </Button>
            </div>

            <div className={CN("grow")}>
                <h1
                    className={CN("player-title")}
                    style={{ color: players[indexPlayer].color }}>
                    {`Игрок ${indexPlayer + 1}`}
                </h1>
                <Field
                    cells={cells}
                    updateCells={updateCells}
                    gameStatus={gameStatus}
                    changeGameStatus={updateGameStatus}
                    countRowCol={currentType}
                    currentPlayer={indexPlayer}
                    changePlayer={changePlayer}
                />
            </div>
            <ModalWindow
                isVisible={isModal}
                onClose={handleClose}
                closeOnClickOutside={true}>
                <WinDrawMessage
                    isWin={gameStatus === GameStatus.Win}
                    indexPlayer={indexPlayer}
                    onClickReset={handleModalReset}
                    onClickShowMenu={handleModalToMenu}
                />
            </ModalWindow>
            <ModalWindow
                isVisible={isMenuModal}
                onClose={handleCloseMenu}
                closeOnClickOutside={true}>
                <MenuContent
                    onClickCancel={handleCloseMenu}
                    onClickSave={handleCloseMenu}
                />
            </ModalWindow>
        </div>
    );
}
