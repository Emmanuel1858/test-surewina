import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountOtpComponent } from './create-account-otp.component';

describe('CreateAccountOtpComponent', () => {
  let component: CreateAccountOtpComponent;
  let fixture: ComponentFixture<CreateAccountOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountOtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
