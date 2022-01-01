import React from 'react';
import { useRef, useState } from 'react';
import { cols, duration, ops, rows } from './Constants';
import { generateGrid, randomGrid } from './Utilities';
import produce from 'immer';
import Cell from './Components/Cell';
import './defaultStyles.css'
import LargeButton from './Components/LargeButton';




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

    <div className='container'>
      <div className='right'>
        <div className="btn-grp">
          <LargeButton label={running ? "Stop" : "Start"}
            color={running ? "red" : "green"}
            action={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                propagate();
              }

            }} />

          <LargeButton label="Clear" action={() => {
            setGrid(generateGrid());
          }} color="palevioletred" />


          <LargeButton label="Random Grid" action={() => {
            setGrid(randomGrid());
          }} />



        </div>

        <div className='info'>
          <h1>Conway's Game of Life</h1>
          <span>It is a cellular automaton, and was invented by Cambridge mathematician John Conway.
            It consists of a grid of cells which, based on a few mathematical rules, can live, die or multiply. Depending on the initial conditions, the cells form various patterns throughout the course of the game.
            <p><a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'> Learn More</a></p>
          </span>
        </div>

      </div>






      <div className='gridCont'>
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
