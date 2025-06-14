import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSellTicketComponent } from './vendor-sell-ticket.component';

describe('VendorSellTicketComponent', () => {
  let component: VendorSellTicketComponent;
  let fixture: ComponentFixture<VendorSellTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSellTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorSellTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
