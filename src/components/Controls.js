import produce from "immer";
import React, { useState, useCallback, useRef } from "react";

const positions = [
	[0, 1],
	[0, -1],
	[1, -1],
	[-1, 1],
	[1, 1],
	[-1, -1],
	[1, 0],
	[-1, 0],
];

const Controls = ({  rowCells, colCells, setGrid }) => {
	const [playing, setPlaying] = useState(false);

	const playingRef = useRef(playing);
	playingRef.current = playing;

	// Logic that makes game work
	const initialize = useCallback(() => {
		if (!playingRef.current) {
			return;
		}
		setGrid((currentGrid) => {
			return produce(currentGrid, (updateGrid) => {
				//loop through every cell
				for (let r = 0; r < rowCells; r++) {
					for (let c = 0; c < colCells; c++) {
						let neighborCells = 0;
						//Compute the number of neighbor cells
						positions.forEach(([x, y]) => {
							const newR = r + x;
							const newC = c + y;
							// Check to make sure cells stay within bounds of grid
							if (
								newR >= 0 &&
								newR < rowCells &&
								newC >= 0 &&
								newC < colCells
							) {
                neighborCells += currentGrid[newR][newC];
							}
						});

						// Rules of Conway's Game of Life
						if (neighborCells < 2 || neighborCells > 3) {
							updateGrid[r][c] = 0;
						} else if (currentGrid[r][c] === 0 && neighborCells === 3) {
							updateGrid[r][c] = 1;
						}
					}
				}
			});
		});

		setTimeout(initialize, 1000);
	}, []);
  
	return (
		<div className="btn_container">
			<button
				className="btn"
				onClick={() => {
					setPlaying(!playing);
					if (!playing) {
            playingRef.current = true;
						initialize();
					}
				}}>
				{playing ? "Stop" : "Play"}
			</button>
			<button className="btn">Pause</button>
			<button className="btn"onClick={() => {
          const rows = [];
          for (let r = 0; r < rowCells; r++) {
            rows.push(
              Array.from(Array(colCells), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }

          setGrid(rows);
        }}>Seed</button>
			<button className="btn">Clear</button>
		</div>
	);
};

export default Controls;
