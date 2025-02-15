import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutVendorComponent } from './layout-vendor.component';

describe('LayoutVendorComponent', () => {
  let component: LayoutVendorComponent;
  let fixture: ComponentFixture<LayoutVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutVendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
