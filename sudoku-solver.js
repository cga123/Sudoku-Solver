class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length!= 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    }
    if (/[^1-9.]/.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowStart = (row.charCodeAt(0) - 65) * 9;
    for (let i = 0; i < 9; i++) {
      if (puzzleString[rowStart + i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let colIndex = parseInt(column) - 1;
    for (let i = 0; i < 9; i++) {
      if (puzzleString[i * 9 + colIndex] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let startRow = Math.floor((row.charCodeAt(0) - 65) / 3) * 3;
    let startCol = Math.floor((column - 1) / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzleString[(startRow + i) * 9 + (startCol + j)] == value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    if (this.validate(puzzleString)!== true) {
      return false;
    }
    
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push(puzzleString.slice(i * 9, (i + 1) * 9).split(''));
    }

    const solveHelper = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === '.') {
            for (let num = 1; num <= 9; num++) {
              let numStr = num.toString();
              if (
                this.checkRowPlacement(board.flat().join(''), String.fromCharCode(65 + row), col + 1, numStr) &&
                this.checkColPlacement(board.flat().join(''), String.fromCharCode(65 + row), col + 1, numStr) &&
                this.checkRegionPlacement(board.flat().join(''), String.fromCharCode(65 + row), col + 1, numStr)
              ) {
                board[row][col] = numStr;
                if (solveHelper()) {
                  return true;
                }
                board[row][col] = '.';
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    if (solveHelper()) {
      return board.flat().join('');
    }
    return false;
  }
}

module.exports = SudokuSolver;
