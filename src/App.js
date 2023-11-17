// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import TicTacToe from './components/game/TicTacToe';
import Home from './components/home/Home';

function About() {
  return <h2>About</h2>;
}

function Projects() {
  return <h2>Projects</h2>;
}

function App() {
  return (
    <Router>
      
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
