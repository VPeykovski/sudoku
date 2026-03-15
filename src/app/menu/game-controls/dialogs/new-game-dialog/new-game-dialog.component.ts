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
  selector: 'new-game-dialog',
  templateUrl: 'new-game-dialog.component.html',
  styleUrl: 'new-game-dialog.component.scss',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewGameDialogComponent>);
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(NewGameDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
