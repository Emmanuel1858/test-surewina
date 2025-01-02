import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountNameComponent } from './create-account-name.component';

describe('CreateAccountNameComponent', () => {
  let component: CreateAccountNameComponent;
  let fixture: ComponentFixture<CreateAccountNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
