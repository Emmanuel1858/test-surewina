import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCreateAccountPasswordComponent } from './vendor-create-account-password.component';

describe('VendorCreateAccountPasswordComponent', () => {
  let component: VendorCreateAccountPasswordComponent;
  let fixture: ComponentFixture<VendorCreateAccountPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCreateAccountPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorCreateAccountPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
