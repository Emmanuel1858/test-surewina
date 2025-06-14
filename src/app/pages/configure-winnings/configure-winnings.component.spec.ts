import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureWinningsComponent } from './configure-winnings.component';

describe('ConfigureWinningsComponent', () => {
  let component: ConfigureWinningsComponent;
  let fixture: ComponentFixture<ConfigureWinningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureWinningsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureWinningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
