import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SudokuStore } from '../../state/sudoku.store';
import { NewGameDialogComponent } from './dialogs/new-game-dialog/new-game-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RestartDialogComponent } from './dialogs/restart-dialog/restart-dialog.component';
import { SolveGameDialogComponent } from './dialogs/solve-game-dialog/solve-game-dialog.component';
import { GameStatusDialogComponent } from './dialogs/game-status-dialog/game-status-dialog.component';

@Component({
  selector: 'app-game-controls',
  imports: [MatButtonModule],
  standalone: true,
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})
export class GameControlsComponent {
  sudokuStore = inject(SudokuStore);
  readonly dialog = inject(MatDialog);
  isLoading = this.sudokuStore.isLoading;

  constructor() {
    effect(() => {
      if (this.sudokuStore.gameStatus()) {
        this.openGameStatusDialog('250ms', '250ms');
      }
    });
  }

  openRestartDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogRef = this.dialog.open(RestartDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.restartGame();
      }
    });
  }

  openNewGameDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.startNewGame();
      }
    });
  }

  openSolveGameDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogRef = this.dialog.open(SolveGameDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.solveGame();
      }
    });
  }

  openGameStatusDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogRef = this.dialog.open(GameStatusDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.startNewGame();
      }
      this.sudokuStore.gameStatus.set(undefined);
    });
  }

  restartGame() {
    this.sudokuStore.setBoard(this.sudokuStore.initialBoard());
  }

  startNewGame() {
    this.sudokuStore.fetchPuzzles();
  }

  validateGame() {
    this.sudokuStore.fetchValidateBoard();
  }

  solveGame() {
    this.sudokuStore.fetchSolveBoard();
  }
}
