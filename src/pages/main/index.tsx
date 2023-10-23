import { useEffect, useState } from "react";
import Field from "../../components/field";
import { cn } from "@bem-react/classname";
import "./style.scss";
import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { PLAYERS } from "../../consts/players";

import { Labels } from "../../consts/labels";
import { GameStatus } from "../../consts/game-status";
import WinDrawMessage from "../../components/win-draw-message";
import MenuContent from "../../components/menu-content";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { ReactSVG } from "react-svg";

const CN = cn("MainPage");

export default function MainPage() {
    const storeType = useSelector((state: RootState) => state.game.typeGame);
    const storePlayers = useSelector(
        (state: RootState) => state.game.countPlayer
    );

    /* ------------------------ PLAYER ------------------------ */
    const [indexPlayer, setIndexPlayer] = useState(0);

    const changePlayer = () => {
        setIndexPlayer(indexPlayer >= storePlayers - 1 ? 0 : indexPlayer + 1);
    };

    /* ------------------------ CELLS ------------------------ */

    const [cells, setCells] = useState<number[]>([]);

    useEffect(() => {
        if (cells.length !== storeType.mapSize ** 2) {
            setCells([...new Array(storeType.mapSize ** 2).fill(0)]);
        }
    }, [storeType.mapSize]);

    const updateCells = (id: number) => {
        const temp = [...cells];
        let res = true;
        if (temp[id] === Labels.Empty) {
            temp[id] = PLAYERS[indexPlayer].label;
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
        setCells([...new Array(storeType.mapSize ** 2).fill(0)]);
        setIndexPlayer(0);
    };

    /* ------------------------ MODAL ------------------------ */

    const [isModal, setIsModal] = useState(false);
    const [isMenuModal, setIsMenuModal] = useState(false);

    const handleClose = () => {
        setIsModal(false);
    };

    // TODO: оптимизировать этот участок кода

    const handleCloseMenu = () => {
        setIsMenuModal(false);
    };

    const handleSaveMenu = () => {
        handleResetClick();
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
        <div className={CN("column", `background-player-${indexPlayer}`)}>
            <div className={CN("row")}>
                <Button onClick={() => setIsMenuModal(true)}>
                    <span className={`color-player-${indexPlayer}`}>Меню</span>
                </Button>
                <Button onClick={handleResetClick}>
                    <span className={CN("icon", `color-player-${indexPlayer}`)}>
                        <ReactSVG src={"/icon/reopen.svg"} />
                    </span>
                </Button>
            </div>

            <div className={CN("grow")}>
                <h1
                    className={CN(
                        "player-title",
                        `color-player-${indexPlayer}`
                    )}>
                    {`Игрок ${indexPlayer + 1}`}
                </h1>
                <Field
                    cells={cells}
                    updateCells={updateCells}
                    gameStatus={gameStatus}
                    changeGameStatus={updateGameStatus}
                    countRowCol={storeType.mapSize}
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
                    onSave={handleSaveMenu}
                />
            </ModalWindow>
        </div>
    );
}
