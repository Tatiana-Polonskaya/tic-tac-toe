import { useState } from "react";
import { cn } from "@bem-react/classname";

import ListWithArrows from "../../list-with-arrows";

import "./style.scss";

type Props = {
    initialNumber: number;
    title: string;
    choices: string[];
    onChangeValue: (value: number, indexPlayer?: number) => void;
    indexPlayer?: number;
};

const CN = cn("TableCell");

export default function TableCell({
    title,
    choices,
    initialNumber,
    onChangeValue,
    indexPlayer,
}: Props) {
    const [currentValue, setCurrentValue] = useState(initialNumber);

    const handleChangeValue = (value: number) => {
        setCurrentValue(value);
        if (indexPlayer !== undefined) {
            onChangeValue(value, indexPlayer);
        } else if (value !== initialNumber) {
            onChangeValue(value);
        }
    };

    return (
        <>
            <div className={CN("cell")}>{title}</div>
            <div
                className={CN("cell", {
                    border: currentValue !== initialNumber,
                })}>
                <ListWithArrows
                    titles={choices.map((el) => el)}
                    initialNumber={initialNumber}
                    setChoosenNumber={handleChangeValue}
                />
            </div>
        </>
    );
}
