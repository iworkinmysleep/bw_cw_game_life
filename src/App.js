import React from 'react';
import './App.css';
import Canvas from './components/Canvas'
import Controls from './components/Controls'

function App() {
  return (
    <div className="App">
      <h1>Conways <span>Game of Life</span></h1>
      <Controls/>
      <Canvas/>
    </div>
  );
}

export default App;
