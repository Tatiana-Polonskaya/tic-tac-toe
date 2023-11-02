import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import { useContext } from "react";

import Button from "../../button";
import { RedButton } from "../../proxy-button";
import { MenuContext } from "../context";

import "./style.scss";

const CN = cn("DefaultSetting");

export type ItemMenu = {
    id: number;
    title: string;
    onClick: () => void;
};

type Props = {
    itemsMenu: ItemMenu[];
};

export default function DefaultSetting({ itemsMenu }: Props) {
    const { goToBack } = useContext(MenuContext);
    return (
        <div className={CN()}>
            {itemsMenu.map((item) => (
                <Button
                    key={item.id}
                    styleClass={CN("btn")}
                    onClick={item.onClick}>
                    <p className={CN("text")}>{item.title}</p>
                    <ReactSVG src="icon/arrow.svg" className={CN("arrow")} />
                </Button>
            ))}
            <RedButton title={"Назад"} onClick={goToBack} />
        </div>
    );
}
