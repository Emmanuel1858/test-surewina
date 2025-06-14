import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAvailableComponent } from './ticket-available.component';

describe('TicketAvailableComponent', () => {
  let component: TicketAvailableComponent;
  let fixture: ComponentFixture<TicketAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
