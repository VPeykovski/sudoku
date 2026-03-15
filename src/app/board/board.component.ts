import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SudokuStore } from '../state/sudoku.store';
import { CellComponent } from '../components/cell/cell.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-board',
  imports: [CellComponent, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  sudokuStore = inject(SudokuStore);

  isLoading = this.sudokuStore.isLoading;
  board = this.sudokuStore.board;
}
