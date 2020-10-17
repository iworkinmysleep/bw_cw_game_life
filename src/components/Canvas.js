import React, { useState, useCallback, useRef } from "react";
import Controls from "./Controls";
import produce from "immer";

const rowCells = 30;
const colCells = 50;

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

const Canvas = () => {
	const [generations, setGenerations] = useState(0);
	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let r = 0; r < rowCells; r++) {
			rows.push(Array.from(Array(colCells), () => 0));
		}
		return rows;
  });
  
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

		setTimeout(initialize, 400);
	}, []);

	return (
		<>
			<h3>Generations: {generations}</h3>
			<div className="game_grid">
				{grid.map((rows, r) =>
					rows.map((cols, c) => (
						<div
							className="cells"
							key={`${r}-${c}`}
							onClick={() => {
								const updateGrid = produce(grid, (newGrid) => {
									newGrid[r][c] = grid[r][c] ? 0 : 1;
								});
								setGrid(updateGrid);
							}}
							style={{
								backgroundColor: grid[r][c] ? "#6897BB" : "#E8EBF5",
							}}
						/>
					))
				)}
			</div>
			<Controls
				setGenerations={setGenerations}
				grid={grid}
				setGrid={setGrid}
        playing={playing}
        setPlaying={setPlaying}
        playingRef={playingRef}
        initialize={initialize}
        rowCells={rowCells}
        colCells={colCells}
			/>
		</>
	);
};

export default Canvas;
