export enum ThemeMode {
    Dark = "dark",
    Light = "light",
    Cosmos = "cosmos",
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
    {
        id: 2,
        mode: ThemeMode.Cosmos,
        title: "Космос",
    },
];
