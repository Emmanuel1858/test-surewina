import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorWinnerBoardComponent } from './vendor-winner-board.component';

describe('VendorWinnerBoardComponent', () => {
  let component: VendorWinnerBoardComponent;
  let fixture: ComponentFixture<VendorWinnerBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorWinnerBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorWinnerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
