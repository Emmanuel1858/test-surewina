import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTicketHistoryComponent } from './vendor-ticket-history.component';

describe('VendorTicketHistoryComponent', () => {
  let component: VendorTicketHistoryComponent;
  let fixture: ComponentFixture<VendorTicketHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorTicketHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorTicketHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
