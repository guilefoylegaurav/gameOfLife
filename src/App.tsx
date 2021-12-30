import React from 'react';
import { useRef, useState } from 'react';
import { cols, duration, ops, pixelWidth, rows } from './Constants';
import { gridContStyle } from './Styles';
import { generateGrid, randomGrid } from './Utilities';
import produce from 'immer';
import Cell from './Components/Cell';




const App: React.FC = () => {
  const [grid, setGrid] = useState(generateGrid())
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;
  const propagate = () => {
    if (!runningRef.current) {
      return;
    }
    setGrid((grid: number[][]) => produce(grid, draft => {
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

    setTimeout(propagate, duration);

  }

  return (
    <div>
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
        setGrid(randomGrid());
      }}>
        Random grid
      </button>
      <div style={gridContStyle}>
        {grid.map((row, i) => row.map((col, j) =>
          <Cell alive={grid[i][j] ? true : false} toggle={() => {
            setGrid(grid => produce(grid, draft => {
              draft[i][j] = grid[i][j] ? 0 : 1;
            }));
          }} />))}
      </div>
    </div>

  );

}
export default App; 
