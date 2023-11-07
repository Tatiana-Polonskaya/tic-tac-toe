export enum Labels {
    Empty = -1,
    Cross = 0,
    Circle = 1,
    Triangle = 2,
    Square = 3,
    Planet = 4,
    Moon = 5,
    Nlo = 6,
    Star = 7,
}
export const CosmosIndexLabels = [
    Labels.Planet,
    Labels.Moon,
    Labels.Nlo,
    Labels.Star,
];

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
    {
        id: Labels.Planet,
        title: "Планета",
        link: "shapes/planet.svg",
    },
    {
        id: Labels.Moon,
        title: "Луна",
        link: "shapes/moon.svg",
    },
    {
        id: Labels.Nlo,
        title: "НЛО",
        link: "shapes/nlo.svg",
    },
    {
        id: Labels.Star,
        title: "Звезда",
        link: "shapes/star.svg",
    },
];

export function getShapeById(id: Labels) {
    return SHAPES.filter((el) => el.id === id)[0];
}
