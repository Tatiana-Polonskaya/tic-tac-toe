import { createContext } from "react";

type MenuType = {
    onSave: () => void;
    goToBack: () => void;
};

export const MenuContext = createContext<MenuType>({
    onSave: () => {},
    goToBack: () => {},
});
