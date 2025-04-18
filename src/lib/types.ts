export type Cell = {
    state: "empty" | "hit" | "miss"
    shipId?: number
    sunk?: boolean
    verified?: boolean
  }
  
  export type Ship = {
    id: number
    name: string
    size: number
    placed: boolean
    orientation: "horizontal" | "vertical"
    hits: number
    sunk: boolean
  }
  
  export type GameState = "setup" | "playing" | "gameover"
  
  export type Difficulty = "easy" | "medium" | "hard"
  