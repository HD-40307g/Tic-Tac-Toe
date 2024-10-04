# Tic Tac Toe App

Welcome to the **Tic Tac Toe App**! This is a simple, interactive web-based game built with **React** and **TypeScript**, where two players can compete to win a classic game of Tic Tac Toe.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dynamic Tic Tac Toe Board**: Responsive 3x3 grid for two-player gameplay.
- **Move History**: Players can go back to any previous move.
- **Move Tracking**: Each move is displayed with its corresponding row and column.
- **Highlight Winning Line**: The app highlights the three squares that form the winning line.
- **Draw Detection**: If the game ends in a draw, a message is displayed.
- **Ascending/Descending Sorting**: Toggle button to sort the move history in ascending or descending order.
- **Interactive UI**: The squares animate on hover and display a dynamic status message for the next player or winner.
- **Responsive Design**: The app is responsive, ensuring a great experience across devices.

## Installation

To run this app locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/HD-40307g/tic-tac-toe-app.git
   cd tic-tac-toe-app
   ```

2. **Install dependencies**:

   You need to have [Node.js](https://nodejs.org/) installed. Once it's installed, run the following command in the project directory:

   ```bash
   npm install
   ```

3. **Start the development server**:

   After the installation is complete, start the app with:

   ```bash
   npm start
   ```

   The app will run at `http://localhost:3000` in your browser.

## Usage

- Click any square to make a move. "X" always goes first.
- View the move history on the right-hand side of the board.
- Use the "Go to move" buttons to jump back to any previous move.
- Use the "Sort by" button to toggle between ascending and descending order for the move list.

## Game Rules

- The game is played on a 3x3 grid.
- Two players take turns: one as "X" and the other as "O".
- A player wins if they get three of their marks in a row (horizontally, vertically, or diagonally).
- The game ends in a draw if all nine squares are filled without a winner.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For adding static typing and ensuring code quality.
- **HTML/CSS**: For structuring and styling the web app.
- **JavaScript (ES6+)**: For game logic and interactivity.

## File Structure

```
├── public
│   └── index.html 
├── src
│   ├── components
│   ├── index.tsx
│   ├── App.tsx
│   └── styles.css   
├── package-lock.json
├── package.json
└── README.md
```

## Contributing

If you would like to contribute to this project, feel free to submit a pull request. Please make sure to write clear, concise commit messages and comments to explain your changes.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch to your fork.
5. Open a pull request on the main repository.

## License

This project is licensed under the MIT License. Feel free to use it and modify it for personal or commercial purposes.
