import { useState } from 'react';
import './App.css';
import Board from './Components/Board';

function App() {
    const [board, setBoard] = useState(Array(6).fill(Array(7).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('red');
    const [winner, setWinner] = useState(null);
  
    const handleClick = (colIndex) => {
      if (winner) return; // Prevent further moves if there is a winner
  
      // Find the first available row from the bottom in the selected column
      const rowIndex = [...board].reverse().findIndex(row => row[colIndex] === null);
      if (rowIndex === -1) return; // If the column is full, do nothing
  
      // Get the correct row index from the bottom
      const actualRowIndex = 5 - rowIndex;
  
      // Update the board state
      const newBoard = board.map((row, rIdx) =>
        rIdx === actualRowIndex ? row.map((cell, cIdx) => (cIdx === colIndex ? currentPlayer : cell)) : row
      );
  
      setBoard(newBoard);
  
      // Check for a win
      if (checkForWin(newBoard, actualRowIndex, colIndex, currentPlayer)) {
        setWinner(currentPlayer);
      } else {
        // Switch to the other player
        setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
      }
    };
  
    const checkForWin = (board, row, col, player) => {
      // Check horizontal, vertical, and both diagonals for a win
      const directions = [
        { x: 1, y: 0 },   // horizontal
        { x: 0, y: 1 },   // vertical
        { x: 1, y: 1 },   // diagonal down-right
        { x: 1, y: -1 }   // diagonal up-right
      ];
  
      for (const { x, y } of directions) {
        let count = 1;
        for (let i = 1; i < 4; i++) {
          if (board[row + i * y] && board[row + i * y][col + i * x] === player) {
            count++;
          } else {
            break;
          }
        }
        for (let i = 1; i < 4; i++) {
          if (board[row - i * y] && board[row - i * y][col - i * x] === player) {
            count++;
          } else {
            break;
          }
        }
        if (count >= 4) {
          return true;
        }
      }
      return false;
    };
  
    const resetGame = () => {
      setBoard(Array(6).fill(Array(7).fill(null)));
      setCurrentPlayer('red');
      setWinner(null);
    };
  
    return (
      <div className="App">
        <h1>Connect 4</h1>
        <Board board={board} handleClick={handleClick} />
        {winner ? <h2>{winner} wins!</h2> : <h2>Current Player: {currentPlayer}</h2>}
        <button onClick={resetGame}>Reset Game</button>
      </div>
  );
}

export default App;
