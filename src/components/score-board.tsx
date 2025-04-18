import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Difficulty } from "@/lib/types";

interface ScoreBoardProps {
  score: number;
  highScores: { difficulty: Difficulty; score: number }[];
}

export default function ScoreBoard({ score, highScores }: ScoreBoardProps) {
  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Score: {score}</h3>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-2">
          <div className="space-y-1">
            {highScores.length > 0 ? (
              highScores.slice(0, 5).map((entry, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    #{index + 1} {entry.difficulty}
                  </span>
                  <span className="font-medium">{entry.score}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No high scores yet</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="medium" className="mt-2">
          <div className="space-y-1">
            {highScores.filter((s) => s.difficulty === "medium").length > 0 ? (
              highScores
                .filter((s) => s.difficulty === "medium")
                .slice(0, 5)
                .map((entry, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>#{index + 1}</span>
                    <span className="font-medium">{entry.score}</span>
                  </div>
                ))
            ) : (
              <div className="text-sm text-gray-500">No medium scores yet</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="hard" className="mt-2">
          <div className="space-y-1">
            {highScores.filter((s) => s.difficulty === "hard").length > 0 ? (
              highScores
                .filter((s) => s.difficulty === "hard")
                .slice(0, 5)
                .map((entry, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>#{index + 1}</span>
                    <span className="font-medium">{entry.score}</span>
                  </div>
                ))
            ) : (
              <div className="text-sm text-gray-500">No hard scores yet</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
