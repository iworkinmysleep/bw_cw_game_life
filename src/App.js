import React from 'react';
import './App.css';
import Canvas from './components/Canvas'
import Controls from './components/Controls'

function App() {
  return (
    <div className="App">
      <h1>Conway's <span><i class="fas fa-less-than"></i>Game of Life/<i class="fas fa-greater-than"></i></span></h1>
      <Canvas/>
      <Controls/>
    </div>
  );
}

export default App;
