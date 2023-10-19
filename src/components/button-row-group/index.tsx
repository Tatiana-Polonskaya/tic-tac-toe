import Button from "../button";

import { cn } from "@bem-react/classname";
import "./style.scss";

export enum TypeButton {
    Red,
    Blue,
}

export type ButtonContent = {
    id: number;
    title: string;
    typeButton: TypeButton;
    onClick: () => void;
};

type Props = {
    buttons: ButtonContent[];
};

const CN = cn("ButtonRowGroup");

export default function ButtonRowGroup({ buttons }: Props) {
    const checkStyle = (style: TypeButton) => {
        if (style === TypeButton.Red) return CN("button-red");
        else return CN("button-blue");
    };

    return (
        <div className={CN()}>
            {buttons.map((el) => (
                <Button
                    key={el.id}
                    onClick={el.onClick}
                    styleClass={checkStyle(el.typeButton)}>
                    {el.title}
                </Button>
            ))}
        </div>
    );
}
