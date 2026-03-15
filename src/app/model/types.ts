export type Difficulty = 'easy' | 'medium' | 'hard' | 'random';
export type Board = number[][];

export type Status = 'solved' | 'broken' | 'unsolved';

export interface SudokuResponse {
  board: Board;
}

export interface SolveResponse {
  difficulty: Difficulty;
  solution: Board;
  status: Status;
}

export interface ValidationResponse {
  status: Status;
}
