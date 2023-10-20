import { PropsWithChildren } from "react";
import { cn } from "@bem-react/classname";
import "./style.scss"

type Props = {
    onClick: () => void;
    styleClass?: string;
};

const CN = cn("Button");

export default function Button(props: PropsWithChildren<Props>) {
    return (
        <div onClick={props.onClick} className={`${CN()} ${props.styleClass}`}>
            {props.children}
        </div>
    );
}
