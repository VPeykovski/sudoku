import { Component, effect, inject } from '@angular/core';
import { SudokuStore } from '../../state/sudoku.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  standalone: true,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  sudokuStore = inject(SudokuStore);
  readonly dialog = inject(MatDialog);

  isLoading = this.sudokuStore.isLoading;
}
