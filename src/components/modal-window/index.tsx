import { PropsWithChildren, useEffect } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";

type Props = {
    isVisible: boolean;
    onClose: () => void;
    closeOnClickOutside?: boolean;
};

const CN = cn("ModalWindow");

export default function ModalWindow({
    isVisible,
    onClose,
    closeOnClickOutside,
    children,
}: PropsWithChildren<Props>) {
    const keydownHandler = ({ key }: KeyboardEvent) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => document.removeEventListener("keydown", keydownHandler);
    });

    return !isVisible ? null : (
        <div className={CN()} onClick={() => closeOnClickOutside && onClose()}>
            <div className={CN("dialog")} onClick={(e) => e.stopPropagation()}>
                <div className={CN("body")}>
                    <div className={CN("content")}>{children}</div>
                </div>
            </div>
        </div>
    );
}
