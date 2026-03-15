import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { updateBoard } from '../../utils/encode.utils';
import { SudokuStore } from '../../state/sudoku.store';

@Component({
  selector: 'app-cell',
  imports: [ReactiveFormsModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent {
  cellValue = input.required<number | null>();
  cellIndex = input.required<{ row: number; col: number }>();
  isPrefilled = input.required<boolean>();

  sudokuStore = inject(SudokuStore);
  board = this.sudokuStore.board;

  form = new FormGroup({
    cell: new FormControl<number | null>(null, [
      Validators.min(1),
      Validators.max(9),
    ]),
  });

  get cellControl() {
    return this.form.get('cell');
  }

  onKeyDown(event: KeyboardEvent) {
    const isValid = /^[1-9]$/.test(event.key);
    const isControl = ['Backspace', 'Delete'].includes(event.key);
    if (!isValid && !isControl) {
      event.preventDefault();

      return;
    }

    if (!isNaN(Number(event.key))) {
      const updatedBoard = updateBoard({
        board: this.board(),
        row: this.cellIndex().row,
        col: this.cellIndex().col,
        value: Number(event.key),
      });

      this.sudokuStore.setBoard(updatedBoard);
    } else {
      const updatedBoard = updateBoard({
        board: this.board(),
        row: this.cellIndex().row,
        col: this.cellIndex().col,
        value: 0,
      });

      this.sudokuStore.setBoard(updatedBoard);
    }

    this.form.patchValue({ cell: null });
  }

  constructor() {
    effect(() => {
      const value = this.cellValue();
      const prefilled = this.isPrefilled();

      this.form.patchValue({ cell: value === 0 ? null : value });

      if (prefilled) {
        this.form.get('cell')?.disable();
      } else {
        this.form.get('cell')?.enable();
      }
    });
  }
  ngOnDestroy() {
    const value = this.cellValue();
    if (value !== 0) {
      this.form.get('cell')?.enable();
    }
  }
}
