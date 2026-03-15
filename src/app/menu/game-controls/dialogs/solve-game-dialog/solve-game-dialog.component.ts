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

@Component({
  selector: 'app-solve-game-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solve-game-dialog.component.html',
  styleUrl: './solve-game-dialog.component.scss',
})
export class SolveGameDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SolveGameDialogComponent>);
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(SolveGameDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
