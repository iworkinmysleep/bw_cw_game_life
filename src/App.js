import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Popup from "reactjs-popup";

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
				<Popup trigger={<a>Rules</a>} modal position="left center">
					{(close) => (
						<div className="modal rules">
							<button className="close" onClick={close}>
								&times;
							</button>
							<div className="header">Rules for Conway's Game of Life</div>
							<div className="content">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque vel eius sint asperiores assumenda optio voluptatibus ipsa in perferendis enim.</div>
						</div>
					)}
				</Popup>
				<Popup trigger={<a>About</a>} modal position="left center">
					{(close) => (
						<div className="modal about">
							<button className="close" onClick={close}>
								&times;
							</button>
							<div className="header">About the game...</div>
							<div className="content">Content here</div>
						</div>
					)}
				</Popup>
				
			</div>

			<Grid />
		</div>
	);
}

export default App;
