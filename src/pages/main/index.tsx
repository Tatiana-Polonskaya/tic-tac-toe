import { useState } from "react";
import Field from "../../components/field";
import { cn } from "@bem-react/classname";
import "./style.scss";
import Button from "../../components/button";
import ModalWindow from "../../components/modal-window";
import { players } from "../../consts/players";

const CN = cn("MainPage");

export default function MainPage() {
    const [indexPlayer, setIndexPlayer] = useState(0);

    const changePlayer = () => {
        setIndexPlayer(
            indexPlayer === players.length - 1 ? 0 : indexPlayer + 1
        );
    };

    return (
        <div
            className={CN("column")}
            style={{
                background: players[indexPlayer].backgroundColor,
            }}>
            <div className={CN("row")}>
                <Button onClick={() => {}} styleClass="">
                    <span style={{ color: players[indexPlayer].color }}>
                        Меню
                    </span>
                </Button>
                <Button onClick={() => {}} styleClass="">
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
                    currentPlayer={indexPlayer}
                    changePlayer={changePlayer}
                />
            </div>
            <ModalWindow />
        </div>
    );
}
