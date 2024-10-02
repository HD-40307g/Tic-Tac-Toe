import React, { useState, useCallback } from 'react';

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className={`square ${isWinningSquare ? "winning-square" : ""}`}
      onClick={onSquareClick}
      aria-label={`Square ${value || ''}`}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const handleClick = useCallback((i) => {
    const winnerInfo = calculateWinner(squares);
    if (winnerInfo?.winner || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    onPlay(nextSquares, `row ${row}, col ${col}`);
  }, [squares, xIsNext, onPlay]);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner || null;
  const winningLine = winnerInfo?.winningLine || [];

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(square => square !== null)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const boardRows = Array.from({ length: 3 }, (_, row) => {
    const boardSquares = Array.from({ length: 3 }, (_, col) => {
      const index = row * 3 + col;
      const isWinningSquare = winningLine.includes(index);
      return (
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isWinningSquare={isWinningSquare}
        />
      );
    });

    return <div key={row} className="board-row">{boardSquares}</div>;
  });

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
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
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), moveLocation: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  const handlePlay = useCallback((nextSquares, moveLocation) => {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, moveLocation }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }, [history, currentMove]);

  const jumpTo = useCallback((nextMove) => {
    setCurrentMove(nextMove);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setIsAscending(!isAscending);
  }, [isAscending]);

  const moves = history.map((step, move) => {
    const { moveLocation } = step;
    const description = move
      ? `Go to move #${move} (${moveLocation})`
      : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <p>You are at move #{currentMove}</p>
        <button onClick={toggleSortOrder}>
          Sort by: {isAscending ? "Descending" : "Ascending"}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}
