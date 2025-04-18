"use client";

import { useDrag } from "react-dnd";
import { RotateCw } from "lucide-react";
import type { Ship } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ShipDockProps {
  ships: Ship[];
  rotateShip: (shipId: number) => void;
  removeShip: (shipId: number) => void;
}

export default function ShipDock({
  ships,
  rotateShip,
  removeShip,
}: ShipDockProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {ships.map((ship) => (
        <DraggableShip
          key={ship.id}
          ship={ship}
          rotateShip={rotateShip}
          removeShip={removeShip}
        />
      ))}
    </div>
  );
}

interface DraggableShipProps {
  ship: Ship;
  rotateShip: (shipId: number) => void;
  removeShip: (shipId: number) => void;
}

function DraggableShip({ ship, rotateShip }: DraggableShipProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ship",
      item: {
        id: ship.id,
        size: ship.size,
        orientation: ship.orientation,
      },
      canDrag: !ship.placed,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [ship]
  );

  const shipStyle = {
    width: ship.orientation === "horizontal" ? `${ship.size * 2}rem` : "2rem",
    height: ship.orientation === "vertical" ? `${ship.size * 2}rem` : "2rem",
  };

  if (ship.placed) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => rotateShip(ship.id)}
        >
          <RotateCw size={14} />
        </Button>
        <span className="text-sm font-medium">{ship.name}</span>
      </div>
      <div
        ref={drag as unknown as React.Ref<HTMLDivElement>}
        style={shipStyle}
        className={`bg-blue-500 border-2 border-blue-700 rounded-sm cursor-move ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      />
    </div>
  );
}
