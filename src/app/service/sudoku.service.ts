import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Board,
  Difficulty,
  SudokuResponse,
  SolveResponse,
  ValidationResponse,
} from '../model/types';
import { encodeParams } from '../utils/encode.utils';

const API_URL = 'https://sugoku.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  http = inject(HttpClient);

  getNewPuzzle(difficulty: Difficulty) {
    return this.http.get<SudokuResponse>(
      `${API_URL}board?difficulty=${difficulty}`,
    );
  }

  validateBoard(board: SudokuResponse) {
    const body = encodeParams(board);

    return this.http.post<ValidationResponse>(`${API_URL}validate`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  solveBoard(board: SudokuResponse) {
    const body = encodeParams(board);

    return this.http.post<SolveResponse>(
      `${API_URL}solve`,
      encodeParams(board),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }
}
