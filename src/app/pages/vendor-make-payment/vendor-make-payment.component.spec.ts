import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMakePaymentComponent } from './vendor-make-payment.component';

describe('VendorMakePaymentComponent', () => {
  let component: VendorMakePaymentComponent;
  let fixture: ComponentFixture<VendorMakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMakePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
