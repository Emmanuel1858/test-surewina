import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCreateAccountNameComponent } from './vendor-create-account-name.component';

describe('VendorCreateAccountNameComponent', () => {
  let component: VendorCreateAccountNameComponent;
  let fixture: ComponentFixture<VendorCreateAccountNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCreateAccountNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorCreateAccountNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
