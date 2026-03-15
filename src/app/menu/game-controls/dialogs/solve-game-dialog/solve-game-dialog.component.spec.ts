import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveGameDialogComponent } from './solve-game-dialog.component';

describe('SolveGameDialogComponent', () => {
  let component: SolveGameDialogComponent;
  let fixture: ComponentFixture<SolveGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolveGameDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolveGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
