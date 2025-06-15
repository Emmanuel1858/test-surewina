import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerBoardComponent } from './winner-board.component';

describe('WinnerBoardComponent', () => {
  let component: WinnerBoardComponent;
  let fixture: ComponentFixture<WinnerBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
