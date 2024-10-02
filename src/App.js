import React from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick, isWinningSquare }) {
  return <button className={`square ${isWinningSquare ? "winning-square" : ""}`} onClick={onSquareClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const winnerInfo = calculateWinner(squares)
    if (winnerInfo?.winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.winningLine : null;

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every(square => square !== null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "x" : "O");
  }

  const boardSize = 3;
  const boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    const boardSquares = [];
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      const isWinningSquare = Array.isArray(winningLine) && winningLine.includes(index);
      boardSquares.push(<Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} isWinningSquare={isWinningSquare}/>);
    }
    boardRows.push(<div key={row} className="board-row">{boardSquares}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] };
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder () {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <a>{"You are at the move # " + currentMove}</a>
        <button onClick={toggleSortOrder}>Sort by: {isAscending ? "Descending" : "Ascending"}</button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}
