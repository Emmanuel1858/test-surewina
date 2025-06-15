import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountAdminComponent } from './create-account-admin.component';

describe('CreateAccountAdminComponent', () => {
  let component: CreateAccountAdminComponent;
  let fixture: ComponentFixture<CreateAccountAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
