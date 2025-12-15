const grid = document.getElementById("grid");
const solveBtn = document.getElementById("solveBtn");
const clearBtn = document.getElementById("clearBtn");
const newBtn = document.getElementById("newBtn");

const cells = [];
const SOLVED_BOARD = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];
function generatePuzzle(difficulty = 45) {
  const board = SOLVED_BOARD.map(row => [...row]);

  let removed = 0;
  while (removed < difficulty) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
      removed++;
    }
  }
  return board;
}
function loadPuzzle() {
  const puzzle = generatePuzzle();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = cells[i * 9 + j];

      if (puzzle[i][j] !== 0) {
        cell.value = puzzle[i][j];
        cell.disabled = true;
        cell.style.color = "#38bdf8"; // fixed numbers
      } else {
        cell.value = "";
        cell.disabled = false;
        cell.style.color = "#f8fafc";
      }
    }
  }
}

// Create Sudoku grid
for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.max = 9;

  input.addEventListener("input", () => {
    if (input.value < 1 || input.value > 9) {
      input.value = "";
    }
  });

  grid.appendChild(input);
  cells.push(input);
}

// Convert UI → board
function getBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push([]);
    for (let j = 0; j < 9; j++) {
      const val = cells[i * 9 + j].value;
      board[i][j] = val === "" ? 0 : Number(val);
    }
  }
  return board;
}

// Convert board → UI
function setBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells[i * 9 + j].value = board[i][j] === 0 ? "" : board[i][j];
    }
  }
}
// Clear grid
function clearGrid() {
  cells.forEach(cell => {
    cell.value = "";
    cell.disabled = false;
    cell.classList.remove("trying", "backtrack", "solved");
    cell.style.color = "#f8fafc";
  });
}

// Check if number is valid
function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
    if (board[x][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

// Backtracking solver
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const cell = cells[row * 9 + col];

        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (!cell.disabled) {
              cell.value = num;
              cell.classList.add("trying");
              await sleep(SPEED);
            }

            if (await solve(board)) {
              cell.classList.remove("trying");
              cell.classList.add("solved");
              return true;
            }

            // BACKTRACK
            board[row][col] = 0;
            if (!cell.disabled) {
              cell.value = "";
              cell.classList.remove("trying");
              cell.classList.add("backtrack");
              await sleep(SPEED);
              cell.classList.remove("backtrack");
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}




// Button handlers
solveBtn.addEventListener("click", async () => {
  const board = getBoard();
  await solve(board);
});


clearBtn.addEventListener("click", () => {
  cells.forEach(cell => (cell.value = ""));
});

loadPuzzle();

newBtn.addEventListener("click", () => {
  clearGrid();
  loadPuzzle();
});

let SPEED = 35; // adjust like pathfinding visualizer

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
