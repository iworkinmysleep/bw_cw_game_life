import React from "react";
import "./App.css";
import Controls from "./components/Controls";
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
							<div className="content">
								<p>
									The universe of the Game of Life is an infinite,
									two-dimensional orthogonal grid of square cells, each of which
									is in one of two possible states, live or dead, (or populated
									and unpopulated, respectively). Every cell interacts with its
									eight neighbours, which are the cells that are horizontally,
									vertically, or diagonally adjacent. At each step in time, the
									following transitions occur:
								</p>
								<ol>
									<li>
										Any live cell with fewer than two live neighbours dies, as
										if by underpopulation.
									</li>
									<li>
										Any live cell with two or three live neighbours lives on to
										the next generation.
									</li>
									<li>
										Any live cell with more than three live neighbours dies, as
										if by overpopulation.
									</li>
									<li>
										Any dead cell with exactly three live neighbours becomes a
										live cell, as if by reproduction.
									</li>
								</ol>
								<p>
									These rules, which compare the behavior of the automaton to
									real life, can be condensed into the following:
								</p>
								<ol>
									<li>
										Any live cell with two or three live neighbours survives.
									</li>
									<li>
										Any dead cell with three live neighbours becomes a live
										cell.
									</li>
									<li>
										All other live cells die in the next generation. Similarly,
										all other dead cells stay dead.
									</li>
								</ol>
								<p>
									The initial pattern constitutes the seed of the system. The
									first generation is created by applying the above rules
									simultaneously to every cell in the seed; births and deaths
									occur simultaneously, and the discrete moment at which this
									happens is sometimes called a tick. Each generation is a pure
									function of the preceding one. The rules continue to be
									applied repeatedly to create further generations.
								</p>
							</div>
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
							<div className="content">
								<p>
									The Game of Life, also known simply as Life, is a cellular
									automaton devised by the British mathematician John Horton
									Conway in 1970.[1] It is a zero-player game, meaning that its
									evolution is determined by its initial state, requiring no
									further input. One interacts with the Game of Life by creating
									an initial configuration and observing how it evolves. It is
									Turing complete and can simulate a universal constructor or
									any other Turing machine.
								</p>
							</div>
						</div>
					)}
				</Popup>
			</div>
			
			<Controls/>
			<footer className="footer">Copyright &copy; Jason Hinton 2020</footer>
		</div>
	);
}

export default App;
