import React from "react";
import produce from "immer";

const Grid = ({ colCells, grid, setGrid, generations, playing }) => {
	return (
		<>
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
								if (!playing) {
									const updateGrid = produce(grid, (newGrid) => {
										newGrid[r][c] = grid[r][c] ? 0 : 1;
									});
									setGrid(updateGrid);
								}
							}}
							style={{
								backgroundColor: grid[r][c] ? "#6897BB" : "#E8EBF5",
							}}
						/>
					))
				)}
			</div>

			<h3 style={{ marginTop: "0", color: "#1ec198" }}>
				Generations: <span className="gen">{generations}</span>
			</h3>
		</>
	);
};

export default Grid;
