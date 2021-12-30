import { rows, cols, ops } from "./Constants";


export const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(Array.from(Array(cols), () => 0));
    }
    return grid;
}

export const randomGrid = () => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(Array.from(Array(cols), () => Math.floor(Math.random()*2)));
    }
    return grid;
}
    