import React, { useState, useEffect } from 'react';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);
  const [winner, setWinner] = useState(null);

  const makeMove = (index) => {
    if (board[index] || winner) {
      return; // Invalid move if the cell is already taken or the game is over
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X);
    }
  };

  const checkWinner = (currentBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return true;
      }
    }

    return false;
  };

  const isBoardFull = () => {
    return board.every(cell => cell !== null);
  };

  const isGameOver = () => {
    return winner || isBoardFull();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(PLAYER_X);
    setWinner(null);
  };

  // Computer player logic
  useEffect(() => {
    if (currentPlayer === PLAYER_O && !isGameOver()) {
      const emptyCells = board.reduce((acc, cell, index) => {
        if (!cell) {
          acc.push(index);
        }
        return acc;
      }, []);

      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const computerMove = emptyCells[randomIndex];

      makeMove(computerMove);
    }
  }, [currentPlayer, board, isGameOver]);

  return (
    <div>
      <div>
        <p>Current Player: {currentPlayer}</p>
        <p>Winner: {winner}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '4px' }}>
        {board.map((value, index) => (
          <button key={index} onClick={() => makeMove(index)} style={{ width: '100px', height: '100px', fontSize: '24px' }}>
            {value}
          </button>
        ))}
      </div>
      {isGameOver() && (
        <div>
          <p>{winner ? `Player ${winner} wins!` : 'It\'s a draw!'}</p>
          <button onClick={resetGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
