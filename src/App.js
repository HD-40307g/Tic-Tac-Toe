import React, { useState } from 'react';

// Square component renders a button for each square in the game board
function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    // Highlight the square if it's part of the winning combination
    <button 
      className={`square ${isWinningSquare ? "winning-square" : ""}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// Board component manages the rendering of the game board and handling player moves
function Board({ xIsNext, squares, onPlay }) {
  // Function to handle a click on a square
  function handleClick(i) {
    const winnerInfo = calculateWinner(squares);
    // Prevent click if there's already a winner or the square is already filled
    if (winnerInfo?.winner || squares[i]) {
      return;
    }
    
    // Clone squares array to avoid mutating state directly
    const nextSquares = squares.slice();
    // Set the current player's mark (X or O)
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // Calculate row and column based on the clicked square's index
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    // Pass the updated squares array and move location to the parent
    onPlay(nextSquares, `row ${row}, col ${col}`);
  }

  // Get the winner information (if any)
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.winningLine : null;

  // Determine the status message (either winner, draw, or next player)
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every(square => square !== null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // Render the 3x3 game board dynamically using loops
  const boardSize = 3;
  const boardRows = [];

  // Loop through the rows
  for (let row = 0; row < boardSize; row++) {
    const boardSquares = [];
    
    // Loop through the columns
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      // Highlight the square if it's part of the winning line
      const isWinningSquare = Array.isArray(winningLine) && winningLine.includes(index);
      
      // Render each square
      boardSquares.push(
        <Square 
          key={index} 
          value={squares[index]} 
          onSquareClick={() => handleClick(index)} 
          isWinningSquare={isWinningSquare} 
        />
      );
    }

    // Add the rendered row of squares to the board
    boardRows.push(
      <div key={row} className="board-row">
        {boardSquares}
      </div>
    );
  }

  // Return the board along with the status message
  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

// Helper function to calculate if there is a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check if any of the lines have matching values (either X or O)
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] };  // Return both winner and the winning line
    }
  }
  return null;  // No winner yet
}

// Game component manages the overall state and history of the game
export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), moveLocation: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  
  // Determine if X is the next player
  const xIsNext = currentMove % 2 === 0;
  // Get the squares for the current move
  const currentSquares = history[currentMove].squares;

  // Handle updating the state after a move
  function handlePlay(nextSquares, moveLocation) {
    // Add the new move to the history (up to the current move, discard future moves if going back)
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, moveLocation }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);  // Set the current move to the latest one
  }

  // Jump to a specific move in the history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Toggle the sorting order of the moves (ascending vs descending)
  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  // Create the move history list with descriptions
  const moves = history.map((step, move) => {
    const { moveLocation } = step;
    let description;
    if (move > 0) {
      description = `Go to move #${move} (${moveLocation})`;  // Show move number and location
    } else {
      description = "Go to game start";  // For the first move
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Sort the moves based on the current sorting order
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  // Render the game board, status, and history list with a sort toggle
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <a>{"You are at move #" + currentMove}</a>  {/* Show the current move */}
        <button onClick={toggleSortOrder}>Sort by: {isAscending ? "Descending" : "Ascending"}</button>
        <ol>{sortedMoves}</ol>  {/* Render the sorted moves */}
      </div>
    </div>
  );
}
