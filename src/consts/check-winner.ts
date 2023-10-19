export function checkDiagonal(symb: number, cells: number[], colCount: number) {
    let toright = true;
    let toleft = true;

    for (let i = 0; i < colCount; i++) {
        toright = toright && cells[(colCount + 1) * i] === symb;
        toleft = toleft && cells[(colCount - 1) * (i + 1)] === symb;
    }

    return toright || toleft;
}

export function checkLanes(symb: number, cells: number[], colCount: number) {
    let cols = true;
    let rows = true;

    for (let row = 0; row < colCount; row++) {
        cols = true;
        rows = true;
        for (let col = 0; col < colCount; col++) {
            rows = rows && cells[row * colCount + col] === symb;
            cols = cols && cells[row + col * colCount] === symb;
        }
        if (cols || rows) return cols || rows;
    }
    return cols || rows;
}

export function checkMapWinning(
    symb: number,
    cells: number[],
    colCount: number
) {
    return (
        checkDiagonal(symb, cells, colCount) ||
        checkLanes(symb, cells, colCount)
    );
}

export function havingCountEmpty(symb: number, cells: number[]) {
    return cells.filter((el) => el === symb).length > 0;
}
