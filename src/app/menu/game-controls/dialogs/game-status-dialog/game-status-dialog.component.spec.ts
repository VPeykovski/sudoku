import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatusDialogComponent } from './game-status-dialog.component';

describe('GameStatusDialogComponent', () => {
  let component: GameStatusDialogComponent;
  let fixture: ComponentFixture<GameStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStatusDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
