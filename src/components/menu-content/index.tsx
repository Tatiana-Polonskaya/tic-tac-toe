import { cn } from "@bem-react/classname";
import "./style.scss";
import ButtonRowGroup, { ButtonContent, TypeButton } from "../button-row-group";

type Props = {
    onClickCancel: () => void;
    onClickSave: () => void;
};

const CN = cn("MenuContent");

export default function MenuContent({ onClickCancel, onClickSave }: Props) {
    const buttons: ButtonContent[] = [
        {
            id: 0,
            title: "Отмена",
            typeButton: TypeButton.Red,
            onClick: onClickCancel,
        },
        {
            id: 1,
            title: "Сохранить",
            typeButton: TypeButton.Blue,
            onClick: onClickSave,
        },
    ];

    return (
        <div className={CN()}>
            <div className={CN("logo")}>
                <img src="./logo.svg" alt="logo" className={CN("logo-img")} />
            </div>
            <div className={CN("table")}>
                <div className={CN("table-cell")}>Уровень сложности: </div>
                <div className={CN("table-cell")}>Легко</div>
                <div className={CN("table-cell")}>Количество игроков: </div>
                <div className={CN("table-cell")}>2</div>
                <div className={CN("table-cell")}>Тема оформления: </div>
                <div className={CN("table-cell")}>Классика</div>
            </div>
            <ButtonRowGroup buttons={buttons} />
        </div>
    );
}
