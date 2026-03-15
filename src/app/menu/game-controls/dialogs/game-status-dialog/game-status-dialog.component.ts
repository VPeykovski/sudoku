import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SudokuStore } from '../../../../state/sudoku.store';

@Component({
  selector: 'app-game-status-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-status-dialog.component.html',
  styleUrl: './game-status-dialog.component.scss',
})
export class GameStatusDialogComponent {
  sudokuStore = inject(SudokuStore);

  gameStatus = this.sudokuStore.gameStatus;

  readonly dialogRef = inject(MatDialogRef<GameStatusDialogComponent>);
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(GameStatusDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
