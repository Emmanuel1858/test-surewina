import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrizeDepotComponent } from './add-prize-depot.component';

describe('AddPrizeDepotComponent', () => {
  let component: AddPrizeDepotComponent;
  let fixture: ComponentFixture<AddPrizeDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrizeDepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrizeDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
