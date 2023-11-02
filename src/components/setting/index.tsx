import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import Button from "../button";
import { RedButton } from "../proxy-button";

import "./style.scss";

const CN = cn("Setting");

export default function Setting() {
    return (
        <div className={CN()}>
            <Button
                styleClass={CN("btn")}
                onClick={() => console.log("click 1")}>
                <p className={CN("text")}>Настройки игры</p>
                <ReactSVG src="icon/arrow.svg" className={CN("arrow")} />
            </Button>
            <Button
                styleClass={CN("btn")}
                onClick={() => console.log("click 2")}>
                <p className={CN("text")}>Изменить фигуры</p>
                <ReactSVG src="icon/arrow.svg" className={CN("arrow")} />
            </Button>
            <RedButton title={"Назад"} onClick={() => console.log("click 2")} />
        </div>
    );
}
