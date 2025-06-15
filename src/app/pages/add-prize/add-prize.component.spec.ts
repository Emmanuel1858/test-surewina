import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrizeComponent } from './add-prize.component';

describe('AddPrizeComponent', () => {
  let component: AddPrizeComponent;
  let fixture: ComponentFixture<AddPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
