// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import TicTacToe from './components/game/TicTacToe';
import PongGame from './components/game/PongGame';
import Home from './components/home/Home';
import About from './components/about/About';
import Projects from './components/projects/Projects';
import ContactMe from './components/contact/ContactMe';
import DarkModeToggle from './components/darkmodetoggle/DarkModeToggle';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <div>
          <Navbar />
          <DarkModeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/pong-game" element={<PongGame />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<ContactMe />} />
          </Routes>
        </div>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
