import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTierComponent } from './configure-tier.component';

describe('ConfigureTierComponent', () => {
  let component: ConfigureTierComponent;
  let fixture: ComponentFixture<ConfigureTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureTierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
