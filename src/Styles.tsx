import { cols, pixelWidth } from "./Constants";

export const gridContStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${pixelWidth}px)`,

}
