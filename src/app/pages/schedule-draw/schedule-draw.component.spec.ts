import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDrawComponent } from './schedule-draw.component';

describe('ScheduleDrawComponent', () => {
  let component: ScheduleDrawComponent;
  let fixture: ComponentFixture<ScheduleDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
