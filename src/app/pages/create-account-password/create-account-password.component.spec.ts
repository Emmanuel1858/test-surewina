import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPasswordComponent } from './create-account-password.component';

describe('CreateAccountPasswordComponent', () => {
  let component: CreateAccountPasswordComponent;
  let fixture: ComponentFixture<CreateAccountPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
