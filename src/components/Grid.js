import React, { useState } from "react";
import Controls from "./Controls";
import produce from "immer";

const rowCells = 30;
const colCells = 50;

const Grid = () => {
	const [generations, setGenerations] = useState(0);
	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let r = 0; r < rowCells; r++) {
			rows.push(Array.from(Array(colCells), () => 0));
		}
		return rows;
	});

	return (
		<>
			<Controls
				generations={generations}
				setGenerations={setGenerations}
				grid={grid}
				setGrid={setGrid}
				rowCells={rowCells}
				colCells={colCells}
			/>
			<div
				className="game_grid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${colCells}, 1rem)`,
				}}>
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
			<h3>Generations: {generations}</h3>
		</>
	);
};

export default Grid;
