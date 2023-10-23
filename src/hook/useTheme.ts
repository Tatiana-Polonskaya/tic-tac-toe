import { ThemeMode } from "../consts/theme";

type useThemeReturn = [(newTheme: ThemeMode) => void];

export const useTheme = (): useThemeReturn => {
    const updateTheme = (newTheme: ThemeMode) => {
        console.log("useTheme theme", newTheme);
        document.body.setAttribute("data-theme", newTheme);
    };

    return [updateTheme];
};
