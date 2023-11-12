import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import Button from "../../button";
import { RedButton } from "../../proxy-button";

import "./style.scss";

const CN = cn("DefaultSetting");

export type ItemMenu = {
    id: number;
    title: string;
    onClick: () => void;
};

type Props = {
    itemsMenu: ItemMenu[];
    onClose: () => void;
};

export default function DefaultSetting({ itemsMenu, onClose }: Props) {
    return (
        <div className={CN()}>
            {itemsMenu.map((item) => (
                <Button
                    key={item.id}
                    styleClass={CN("btn")}
                    onClick={item.onClick}>
                    <p className={CN("text")}>{item.title}</p>
                    <ReactSVG src="icon/arrow.svg" className={CN("arrow")} />
                    <span className={CN("flare")}></span>
                </Button>
            ))}
            <RedButton title={"Отмена"} onClick={onClose} />
        </div>
    );
}
