"use client";

import { useDrop } from "react-dnd";
import type { Cell, GameState } from "@/lib/types";

interface GameBoardProps {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
  isPlayerBoard: boolean;
  gameState: GameState;
  placeShip: (
    shipId: number,
    row: number,
    col: number,
    orientation: "horizontal" | "vertical"
  ) => boolean;
  markEmptyCells: boolean;
}

export default function GameBoard({
  board,
  onCellClick,
  isPlayerBoard,
  gameState,
  placeShip,
  markEmptyCells,
}: GameBoardProps) {
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "ship",
      drop: (
        item: {
          id: number;
          size: number;
          orientation: "horizontal" | "vertical";
        },
        monitor
      ) => {
        const { x, y } = monitor.getClientOffset() || { x: 0, y: 0 };
        const boardElement = document.getElementById("player-board");
        if (!boardElement) return;

        const rect = boardElement.getBoundingClientRect();
        const cellSize = rect.width / 10;

        // Calculate the cell coordinates
        const col = Math.floor((x - rect.left) / cellSize);
        const row = Math.floor((y - rect.top) / cellSize);

        if (row >= 0 && row < 10 && col >= 0 && col < 10) {
          placeShip(item.id, row, col, item.orientation);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [placeShip]
  );

  return (
    <div className="relative">
      <div className="flex">
        <div className="w-8"></div>
        {columns.map((col) => (
          <div
            key={col}
            className="w-8 h-8 flex items-center justify-center font-bold text-gray-600"
          >
            {col}
          </div>
        ))}
      </div>

      <div
        id={isPlayerBoard ? "player-board" : "computer-board"}
        ref={(node) => {
          if (isPlayerBoard && gameState === "setup") {
            drop(node);
          }
        }}
        className={`relative ${isOver ? "bg-blue-100" : ""}`}
      >
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-600">
              {rowIndex + 1}
            </div>

            {row.map((cell, colIndex) => {
              let cellClass =
                "w-8 h-8 border border-blue-300 flex items-center justify-center";

              if (cell.state === "hit") {
                cellClass += " bg-red-500";
              } else if (cell.state === "miss") {
                cellClass += " bg-gray-300";
              } else if (cell.shipId && isPlayerBoard) {
                cellClass += " bg-blue-500";
                if (cell.sunk) {
                  cellClass += " bg-red-700";
                }
              }

              // Add hover effect for computer board during play
              if (
                !isPlayerBoard &&
                gameState === "playing" &&
                cell.state === "empty"
              ) {
                cellClass += " hover:bg-blue-100 cursor-pointer";
              }

              // Mark verified empty cells if enabled
              const isVerifiedEmpty =
                cell.state === "miss" ||
                (markEmptyCells && cell.state === "empty" && cell.verified);

              return (
                <div
                  key={colIndex}
                  className={cellClass}
                  onClick={() => onCellClick(rowIndex, colIndex)}
                >
                  {isVerifiedEmpty && <span className="text-gray-500">•</span>}
                  {cell.state === "hit" && (
                    <span className="text-white">×</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
