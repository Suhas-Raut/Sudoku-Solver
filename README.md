# 🧩 Sudoku Solver & Visualizer

A **Sudoku Solver with step-by-step animation**, inspired by **pathfinding visualizers**.  
Built using **vanilla HTML, CSS, and JavaScript**, this project visualizes the **backtracking algorithm** in real time.

---

## ✨ Features

### Snapshots -
- User Interface
 <img align="center" src="https://github.com/Suhas-Raut/Sudoku-Solver/blob/main/assets/logo.PNG" alt="UI1" >

- Animation while Solving
- <img align="center" src="https://github.com/Suhas-Raut/Sudoku-Solver/blob/main/assets/logo.PNG" alt="UI2" >

- Solved Sudoku Visualization
- <img align="center" src="https://github.com/Suhas-Raut/Sudoku-Solver/blob/main/assets/logo.PNG" alt="UI3" >


- 🎲 **Random Puzzle Generator**
- 🔒 **Prefilled cells are locked**
- ▶️ **Animated solving (step-by-step)**
- 🎨 **Gradient Box visuals**
  - 🟨 Trying (exploring)
  - 🟥 Backtracking (dead end)
  - 🟩 Solved (final solution)
- ♻️ New Puzzle button
- 🧹 Clear Grid button
- 📦 No frameworks, no libraries

---

## 🧠 Algorithm Used

### Backtracking (Depth-First Search)

1. Find an empty cell
2. Try numbers 1–9
3. Validate row, column, and 3×3 grid
4. Recurse forward if valid
5. Backtrack on failure

The algorithm is visualized using async recursion and controlled delays.

---

## 📁 Project Structure
SUDOKU-SOLVER
 ├── assets
 │    ├── logo.PNG
 │    ├── SS1.png
 │    ├── SS2.png
 │    └── SS3.png
 ├── index.html
 ├── README.md
 ├── script.js
 └── style.css
 