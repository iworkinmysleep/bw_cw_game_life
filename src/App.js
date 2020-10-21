import React from "react";
import "./App.css";
import Grid from "./components/Grid";


function App() {

  
	return (
		<div className="App">
			<h1>
				Conway's{" "}
				<span>
					<i className="fas fa-less-than"></i>Game of Life
					<i className="fas fa-greater-than"></i>
				</span>
			</h1>
			<div className="nav">
				<a href="#">Rules</a>
				<a href="#">About</a>
			</div>
			<Grid />
		</div>
	);
}

export default App;
