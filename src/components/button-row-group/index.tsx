import Button from "../button";

import { cn } from "@bem-react/classname";
import "./style.scss";
import { TypeButton } from "../../consts/type-button";

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

    return (
        <div className={CN()}>
            {buttons.map((el) => (
                <Button
                    key={el.id}
                    onClick={el.onClick}
                    styleClass={CN(el.typeButton)}>
                    {el.title}
                </Button>
            ))}
        </div>
    );
}
