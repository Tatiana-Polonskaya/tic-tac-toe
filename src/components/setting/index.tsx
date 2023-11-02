import { useState } from "react";

import DefaultSetting from "./-default";
import MenuContent from "../menu-content";
import { MenuContext } from "./context";
import ShapesSetting from "./-shapes";
import MenuLayout from "../../layout/menu";

enum LevelMenu {
    Default = 0,
    GameSetting = 1,
    EditShapes = 2,
}

type Props = {
    onSave: () => void;
};

export default function Setting({ onSave }: Props) {
    const [step, setStep] = useState(LevelMenu.Default);

    const changeLevelToGameSetting = () => {
        setStep(LevelMenu.GameSetting);
    };

    const changeLevelToEditShapes = () => {
        setStep(LevelMenu.EditShapes);
    };

    const handleClickCancel = () => {
        setStep(LevelMenu.Default);
    };

    const ItemsMenu = [
        {
            id: 0,
            title: "Настройки игры",
            onClick: changeLevelToGameSetting,
        },
        {
            id: 1,
            title: "Изменить фигуры",
            onClick: changeLevelToEditShapes,
        },
    ];

    return (
        <MenuLayout>
            <MenuContext.Provider
                value={{
                    onSave: onSave,
                    goToBack: handleClickCancel,
                }}>
                {step === LevelMenu.Default && (
                    <DefaultSetting itemsMenu={ItemsMenu} />
                )}
                {step === LevelMenu.GameSetting && <MenuContent />}
                {step === LevelMenu.EditShapes && <ShapesSetting />}
            </MenuContext.Provider>
        </MenuLayout>
    );
}