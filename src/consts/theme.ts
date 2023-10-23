export enum ThemeMode {
    Dark = "dark",
    Light = "light",
    Cosmos = "cosmoc",
}

export type ThemeObject = {
    id: number;
    mode: ThemeMode;
    title: string;
};

export const Theme: ThemeObject[] = [
    {
        id: 0,
        mode: ThemeMode.Light,
        title: "Светлая",
    },
    {
        id: 1,
        mode: ThemeMode.Dark,
        title: "Темная",
    },
];
