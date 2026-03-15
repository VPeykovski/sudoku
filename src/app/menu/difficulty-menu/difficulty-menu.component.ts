import { Component, inject, signal } from '@angular/core';
import { SudokuStore } from '../../state/sudoku.store';
import { MatButtonModule } from '@angular/material/button';
import { Difficulty } from '../../model/types';

@Component({
  selector: 'app-difficulty-menu',
  imports: [MatButtonModule],
  standalone: true,
  templateUrl: './difficulty-menu.component.html',
  styleUrl: './difficulty-menu.component.scss',
})
export class DifficultyMenuComponent {
  sudokuStore = inject(SudokuStore);
  currentDifficulty = signal<Difficulty | null>(this.sudokuStore.difficulty());
  isLoading = this.sudokuStore.isLoading;

  selectDifficulty(difficulty: Difficulty) {
    this.currentDifficulty.set(difficulty);
    this.sudokuStore.setDifficulty(difficulty);
    this.sudokuStore.fetchPuzzles();
  }
}
