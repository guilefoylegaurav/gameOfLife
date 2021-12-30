import * as React from 'react';
import { useRef, useState } from 'react';
import { cols, ops, pixelWidth, rows } from './Constants';
import { cellStyle, gridContStyle } from './Styles';
import { generateGrid } from './Utilities';
import produce from 'immer';
export interface IAppProps {
}



export default function App(props: IAppProps) {
  const [grid, setGrid] = useState(generateGrid())
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;
  const propagate = () => {
    if (!runningRef.current) {
      return;
    }
    setGrid(grid => produce(grid, draft => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let neighbours = 0;
          ops.forEach(([x, y]) => {
            let newX = i + x;
            let newY = j + y;
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
              neighbours += grid[newX][newY];
            }
          });
          if (grid[i][j] === 1) {
            if (neighbours < 2) {
              draft[i][j] = 0;
            }
            else if (neighbours === 2 || neighbours === 3) {
              draft[i][j] = 1;
            }
            else if (neighbours > 3) {
              draft[i][j] = 0;
            }

          }
          else {
            if (neighbours === 3) {
              draft[i][j] = 1;
            }

          }


        }
      }


    }));

    setTimeout(propagate, 100);

  }
  return (
    <React.Fragment>
      <button onClick={() => {

        setRunning(!running);
        if (!running) {
          runningRef.current = true;
          propagate();
        }

      }}> {running ? "Stop" : "Start"} </button>

      <button onClick={() => {
        setGrid(generateGrid());
      }}>Clear</button>

      <button onClick={() => {
        setGrid(grid => produce(grid, draft => {
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                 draft[i][j] = Math.floor(Math.random() * 2); 
            }
          }
        })); 

       



      }}>
        Random grid
      </button>
      <div style={gridContStyle}>
        {grid.map((row, rowIndex) => row.map((col, colIndex) =>
          <div

            onClick={() => {
              const nextState = produce(grid, draft => {
                draft[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;

              });
              setGrid(nextState);

            }}

            style={
              {
                height: pixelWidth,
                backgroundColor: grid[rowIndex][colIndex] ? "lightgreen" : "white",
                border: "2px solid black"
              }
            }></div>
        ))}
      </div>
    </React.Fragment>

  );
}
