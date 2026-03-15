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
  selector: 'app-restart-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  standalone: true,
  templateUrl: './restart-dialog.component.html',
  styleUrl: './restart-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestartDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RestartDialogComponent>);
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(RestartDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
