import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCreateAccountOtpComponent } from './vendor-create-account-otp.component';

describe('VendorCreateAccountOtpComponent', () => {
  let component: VendorCreateAccountOtpComponent;
  let fixture: ComponentFixture<VendorCreateAccountOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCreateAccountOtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorCreateAccountOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
