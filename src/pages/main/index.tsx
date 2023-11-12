import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { RootState } from "../../store/store";

import { cn } from "@bem-react/classname";

import Button from "../../components/button";
import Field from "../../components/field";
import ModalWindow from "../../components/modal-window";
import Setting from "../../components/setting";
import WinDrawMessage from "../../components/win-draw-message";

import { GameStatus } from "../../consts/game-status";
import { PLAYERS } from "../../consts/players";

import { PlayerContext } from "./context";

import "./style.scss";

const CN = cn("MainPage");

export default function MainPage() {
    const storePlayers = useSelector(
        (state: RootState) => state.game.countPlayer
    );

    /* ------------------------ PLAYER ------------------------ */
    const [indexPlayer, setIndexPlayer] = useState(0);

    const changePlayer = () => {
        setIndexPlayer(indexPlayer >= storePlayers - 1 ? 0 : indexPlayer + 1);
    };

    /* ------------------------ STATUS ------------------------ */

    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Start);

    const updateGameStatus = useCallback((status: GameStatus) => {
        setGameStatus(status);
    }, []);

    const handleResetClick = useCallback(() => {
        updateGameStatus(GameStatus.Start);
        setIndexPlayer(0);
    }, [updateGameStatus]);

    /* ------------------------ MODAL ------------------------ */

    const [isWinDrawModal, setIsWinDrawModal] = useState(false);
    const [isMenuModal, setIsMenuModal] = useState(false);

    const handleShowMenuModal = () => setIsMenuModal(true);

    const handleClose = () => {
        setIsWinDrawModal(false);
    };

    const handleCloseMenu = () => {
        setIsMenuModal(false);
    };

    const handleSaveMenu = () => {
        handleResetClick();
        handleCloseMenu();
    };

    const handleModalReset = () => {
        handleClose();
        handleResetClick();
    };

    const handleModalToMenu = () => {
        handleClose();
        handleShowMenuModal();
    };

    useEffect(() => {
        if (gameStatus === GameStatus.Win || gameStatus === GameStatus.Draw)
            setIsWinDrawModal(true);
    }, [gameStatus]);

    return (
        <div className={CN("column", `background-player-${indexPlayer}`)}>
            <div className={CN("row")}>
                <Button onClick={handleShowMenuModal}>
                    <span className={`color-player-${indexPlayer}`}>Меню</span>
                </Button>
                <Button onClick={handleResetClick}>
                    <span className={CN("icon", `color-player-${indexPlayer}`)}>
                        <ReactSVG src={"./icon/reopen.svg"} />
                    </span>
                </Button>
            </div>

            <PlayerContext.Provider
                value={{ currentPlayer: PLAYERS[indexPlayer], changePlayer }}>
                <div className={CN("grow")}>
                    <h1
                        className={CN(
                            "player-title",
                            `color-player-${indexPlayer}`
                        )}>
                        {`Игрок ${indexPlayer + 1}`}
                    </h1>
                    <Field
                        gameStatus={gameStatus}
                        changeGameStatus={updateGameStatus}
                    />
                </div>
            </PlayerContext.Provider>

            <ModalWindow
                isVisible={isWinDrawModal}
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
                <Setting onSave={handleSaveMenu} onClose={handleCloseMenu} />
            </ModalWindow>
        </div>
    );
}
