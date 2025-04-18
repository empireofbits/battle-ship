"use client";
import BattleshipGame from "@/components/battleship-game";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-slate-100">
      <Suspense fallback={<p>Loading search...</p>}>
        <BattleshipGame />
      </Suspense>
    </main>
  );
}
