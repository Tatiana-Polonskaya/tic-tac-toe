import { useCallback, useEffect, useState } from "react";
import Field from "../../components/field";
import { cn } from "@bem-react/classname";
import "./style.scss";
import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";

import { GameStatus } from "../../consts/game-status";
import WinDrawMessage from "../../components/win-draw-message";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { ReactSVG } from "react-svg";
import { PlayerContext } from "./context";
import Setting from "../../components/setting";
import { PLAYERS } from "../../consts/players";

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

    const updateGameStatus = (status: GameStatus) => {
        setGameStatus(status);
    };

    const handleResetClick = useCallback(() => {
        updateGameStatus(GameStatus.Start);
        setIndexPlayer(0);
    }, []);

    /* ------------------------ MODAL ------------------------ */

    const [isModal, setIsModal] = useState(false);
    const [isMenuModal, setIsMenuModal] = useState(false);

    const handleShowMenuModal = () => setIsMenuModal(true);

    const handleClose = () => {
        setIsModal(false);
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
            setIsModal(true);
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
                <Setting onSave={handleSaveMenu} />
            </ModalWindow>
        </div>
    );
}
