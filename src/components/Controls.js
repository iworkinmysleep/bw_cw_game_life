import produce from "immer";
import React, { useState, useCallback, useRef } from "react";
import Grid from './Grid'

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

const rowCells = 30;
const colCells = 50;
let speed = 300;

const Controls = () => {
	const [playing, setPlaying] = useState(false);
	const [generations, setGenerations] = useState(0);
	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let r = 0; r < rowCells; r++) {
			rows.push(Array.from(Array(colCells), () => 0));
		}
		return rows;
	});

	const playingRef = useRef(playing);
	playingRef.current = playing;

	const generationsRef = useRef(generations);
	generationsRef.current = generations;

	const resetGrid = () => {
		const rows = [];
		for (let r = 0; r < rowCells; r++) {
			rows.push(Array.from(Array(colCells), () => 0));
		}
		return rows;
	};

	const Seed = () => {
		const rows = [];
		for (let r = 0; r < rowCells; r++) {
			rows.push(
				Array.from(Array(colCells), () => (Math.random() > 0.7 ? 1 : 0))
			);
		}
		setGrid(rows);
	};

	// Logic that makes game work
	const step = useCallback(() => {
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
		setGenerations(++generationsRef.current);
	}, []);

	const initialize = useCallback(() => {
		if (!playingRef.current) {
			return;
		}

		step();

		setTimeout(initialize, speed);
	}, []);

	return (
		<>
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
				<button className="btn" onClick={Seed}>
					Seed
				</button>
				<button className="btn" disabled= {playing} onClick={step}>
					Step
				</button>
				<button
					className="btn"
					disabled={playing}
					onClick={() => {
						setGrid(resetGrid());
						setGenerations(0);
					}}>
					Clear
				</button>
				<button
					className="btn"
					onClick={() => {
						speed = 100;
					}}>
					Faster
				</button>
				<button
					className="btn"
					onClick={() => {
						speed = 1000;
					}}>
					Slower
				</button>

				
			</div>
			<Grid 
			rowCells={rowCells}
			colCells={colCells}
			grid={grid}
			setGrid={setGrid}
			generations={generations}
			setGenerations={setGenerations}
			playing={playing}
			/>
		</>
	);
};

export default Controls;
