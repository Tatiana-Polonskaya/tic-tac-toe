import { useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";

type Props = {
    titles: string[];
    initialNumber: number;
    setChoosenNumber: (value: number) => void;
};

const CN = cn("ListWithArrows");

export default function ListWithArrows({ titles, initialNumber, setChoosenNumber }: Props) {
    const [slide, setSlide] = useState(initialNumber);

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = titles.length - 1;
        } else {
            slideNumber = (slide + direction) % titles.length;
        }
        setChoosenNumber(slideNumber);
        setSlide(slideNumber);
    };

    return (
        <div className={CN("slider")}>
            <div className={CN("arrows")}>
                <div
                    className={CN("arrows-arrow-left")}
                    onClick={() => changeSlide(-1)}
                />
                <div
                    className={CN("arrows-arrow-right")}
                    onClick={() => changeSlide(1)}
                />
            </div>

            <div
                className={CN("slider-list")}
                style={{ transform: `translateX(-${slide * 100}%)` }}>
                {titles.map((title, index) => (
                    <div key={index} className={CN("slider-slide")}>
                        {title}{" "}
                    </div>
                ))}
            </div>
        </div>
    );
}
