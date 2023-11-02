export enum Labels {
    Empty = -1,
    Cross = 0,
    Circle = 1,
    Triangle = 2,
    Square = 3,
}

export type Shape = {
    id: number;
    title: string;
    link: string;
};

export const SHAPES: Shape[] = [
    {
        id: Labels.Cross,
        title: "Крест",
        link: "shapes/cross.svg",
    },
    {
        id: Labels.Circle,
        title: "Нуль",
        link: "shapes/circle.svg",
    },
    {
        id: Labels.Triangle,
        title: "Треугольник",
        link: "shapes/triangle.svg",
    },
    {
        id: Labels.Square,
        title: "Квадрат",
        link: "shapes/rectangle.svg",
    },
];
