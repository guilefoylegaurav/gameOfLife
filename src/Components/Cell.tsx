import React from 'react';
import { pixelWidth } from '../Constants';



interface Props {
    alive: boolean,
    toggle: Function,
};



const Cell: React.FC<Props> = ({
    alive, toggle
}) => {
    return (<div

        onClick={() => {
            toggle();
        }}

        style={
            {
                height: pixelWidth,
                backgroundColor: alive ? "lightgreen" : "white",
                border: "2px solid black"
            }
        }></div>);
};

export default Cell;
