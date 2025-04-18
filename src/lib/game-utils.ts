import type { Cell, Ship } from "./types";

export function generateEmptyBoard(): Cell[][] {
  const board: Cell[][] = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = { state: "empty" };
    }
  }
  return board;
}

export function isValidPlacement(
  board: Cell[][],
  row: number,
  col: number,
  size: number,
  orientation: "horizontal" | "vertical"
): boolean {
  // Check if ship is within board boundaries
  if (orientation === "horizontal") {
    if (col + size > 10) return false;
  } else {
    if (row + size > 10) return false;
  }

  // Check if there's no overlap with other ships
  // Also check adjacent cells (ships can't touch)
  for (
    let r = Math.max(0, row - 1);
    r <= Math.min(9, orientation === "vertical" ? row + size : row + 1);
    r++
  ) {
    for (
      let c = Math.max(0, col - 1);
      c <= Math.min(9, orientation === "horizontal" ? col + size : col + 1);
      c++
    ) {
      if (board[r][c].shipId) {
        return false;
      }
    }
  }

  return true;
}

export function placeShipsRandomly(board: Cell[][], ships: Ship[]) {
  const newBoard = JSON.parse(JSON.stringify(board)) as Cell[][];
  const newShips = [...ships];

  for (let i = 0; i < newShips.length; i++) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      attempts++;

      // Randomly choose orientation
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";

      // Randomly choose position
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      if (isValidPlacement(newBoard, row, col, newShips[i].size, orientation)) {
        // Place the ship
        for (let j = 0; j < newShips[i].size; j++) {
          const r = orientation === "horizontal" ? row : row + j;
          const c = orientation === "horizontal" ? col + j : col;

          newBoard[r][c] = {
            state: "empty",
            shipId: newShips[i].id,
          };
        }

        newShips[i] = {
          ...newShips[i],
          placed: true,
          orientation,
        };

        placed = true;
      }
    }

    // If we couldn't place a ship after max attempts, reset and try again
    if (!placed) {
      return placeShipsRandomly(generateEmptyBoard(), ships);
    }
  }

  return { board: newBoard, updatedShips: newShips };
}

export function areAllShipsSunk(ships: Ship[]): boolean {
  return ships.every((ship) => ship.sunk);
}
