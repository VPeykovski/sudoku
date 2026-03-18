import { computed, inject, Injectable, signal } from '@angular/core';
import { SudokuService } from '../service/sudoku.service';
import { Difficulty, Status, SudokuResponse } from '../model/types';
import { catchError, finalize } from 'rxjs';
import { loadFromStorage, saveToStorage } from '../utils/storage.utils';

const defaultBoard = [
  //1  2  3  4  5  6  7  8  9
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 1 */,
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 2 */,
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 3 */,
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 4 */,
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 5 */,
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 6 */,
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 7 */,
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 8 */,
  [0, 0, 0, 0, 0, 0, 0, 0, 0] /* 9 */,
];

const STORAGE_KEYS = {
  initialBoard: 'initial_board',
  currentBoard: 'current_board',
  difficulty: 'difficulty',
};

@Injectable({
  providedIn: 'root',
})
export class SudokuStore {
  sudokuService = inject(SudokuService);
  private _initialBoard = signal<SudokuResponse>(
    loadFromStorage(STORAGE_KEYS.initialBoard, { board: defaultBoard }),
  );
  private _currentBoard = signal<SudokuResponse>(
    loadFromStorage(STORAGE_KEYS.currentBoard, { board: defaultBoard }),
  );

  initialBoard = computed(() => this._initialBoard().board);

  board = computed(() => {
    const puzzle = this._currentBoard();
    return puzzle?.board ?? [];
  });

  difficulty = signal<Difficulty>(
    loadFromStorage(STORAGE_KEYS.difficulty, 'easy'),
  );

  isPrefilled = computed(() => (row: number, col: number) => {
    const puzzle = this._initialBoard();
    return puzzle?.board[row]?.[col] !== 0;
  });

  isLoading = signal<boolean>(false);

  gameStatus = signal<Status | undefined>(undefined);

  setDifficulty(difficulty: Difficulty) {
    this.difficulty.set(difficulty);
    saveToStorage(STORAGE_KEYS.difficulty, difficulty);
  }

  setBoard(board: number[][]) {
    this._currentBoard.set({ board });
    saveToStorage(STORAGE_KEYS.currentBoard, { board });
  }

  getInitialBoard() {
    return this._initialBoard();
  }

  fetchPuzzles() {
    const difficulty = this.difficulty();
    this.isLoading.set(true);

    this.sudokuService
      .getNewPuzzle(difficulty)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching puzzle:', error);
          return [];
        }),
      )
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((response) => {
        this._initialBoard.set(response);
        this._currentBoard.set(response);

        saveToStorage(STORAGE_KEYS.initialBoard, response);
        saveToStorage(STORAGE_KEYS.currentBoard, response);
      });
  }

  fetchValidateBoard() {
    this.isLoading.set(true);

    this.sudokuService
      .validateBoard({ board: this.board() })
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching puzzle:', error);
          return [];
        }),
      )
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((response) => {
        this.gameStatus.set(response.status);
      });
  }

  fetchSolveBoard() {
    this.isLoading.set(true);

    this.sudokuService
      .solveBoard({ board: this.initialBoard() })
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching puzzle:', error);
          return [];
        }),
      )
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((response) => {
        this._currentBoard.set({ board: response.solution });
      });
  }
}
