import Button from "../button";
import { cn } from "@bem-react/classname";
import "./style.scss";

type Props = {
    title: string;
    onClick: () => void;
};

const CN = cn("ProxyButton");

export function RedButton({ title, onClick }: Props) {
    return (
        <Button styleClass={CN("button-red ")} onClick={onClick}>
            {title}
        </Button>
    );
}

export function BlueButton({ title, onClick }: Props) {
    return (
        <Button styleClass={CN("button-blue")} onClick={onClick}>
            {title}
        </Button>
    );
}
