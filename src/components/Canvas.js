import React, { useState } from "react";
const rowCells = 30;
const colCells = 50;

const Canvas = () => {
  const [generations, setGenerations] = useState(0)
	const [grid, setGrid] = useState(() => {
		const rows = [];
		for (let i = 0; i < rowCells; i++) {
			rows.push(Array.from(Array(colCells), () => false));
		}
		return rows;
	});


	return (
    <>
    <h3>Generations: {generations}</h3>
		<div className="game_grid">
			{grid.map((rows, i) =>
				rows.map((cols, j) => (
					<div
						className="cells"
						key={`${i}-${j}`}
						style={{
							backgroundColor: grid[i][j] ? "#6897BB" : '#E8EBF5'
						}}
					/>
				))
			)}
		</div>
    </>
	);
};

export default Canvas;
