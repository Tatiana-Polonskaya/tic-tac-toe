import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";

import "./style.scss";
import { PropsWithChildren } from "react";

const CN = cn("MenuLayout");

export default function MenuLayout({ children }: PropsWithChildren) {
    return (
        <div className={CN()}>
            <div className={CN("logo")}>
                <ReactSVG src={"./logo.svg"} className={CN("logo-img")} />
            </div>
            <div>{children}</div>
        </div>
    );
}
