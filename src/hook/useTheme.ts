import { ThemeMode } from "../consts/theme";

type useThemeReturn = [(newTheme: ThemeMode) => void];

export const useTheme = (): useThemeReturn => {
    const updateTheme = (newTheme: ThemeMode) => {
        document.body.setAttribute("data-theme", newTheme);
    };

    return [updateTheme];
};
