import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyMenuComponent } from './difficulty-menu.component';

describe('DifficultyMenuComponent', () => {
  let component: DifficultyMenuComponent;
  let fixture: ComponentFixture<DifficultyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifficultyMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifficultyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
