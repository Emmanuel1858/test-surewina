import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPortalLoginComponent } from './admin-portal-login.component';

describe('AdminPortalLoginComponent', () => {
  let component: AdminPortalLoginComponent;
  let fixture: ComponentFixture<AdminPortalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPortalLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPortalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
