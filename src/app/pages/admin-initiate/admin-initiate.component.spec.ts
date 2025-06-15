import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInitiateComponent } from './admin-initiate.component';

describe('AdminInitiateComponent', () => {
  let component: AdminInitiateComponent;
  let fixture: ComponentFixture<AdminInitiateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInitiateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
