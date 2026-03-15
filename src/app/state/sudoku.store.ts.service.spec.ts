import { TestBed } from '@angular/core/testing';

import { SudokuStore } from './sudoku.store';

describe('SudokuStore', () => {
  let service: SudokuStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
