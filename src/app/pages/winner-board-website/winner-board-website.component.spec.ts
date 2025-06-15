import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerBoardWebsiteComponent } from './winner-board-website.component';

describe('WinnerBoardWebsiteComponent', () => {
  let component: WinnerBoardWebsiteComponent;
  let fixture: ComponentFixture<WinnerBoardWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerBoardWebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerBoardWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
