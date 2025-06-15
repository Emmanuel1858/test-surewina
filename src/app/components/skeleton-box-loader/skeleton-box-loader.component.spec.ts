import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBoxLoaderComponent } from './skeleton-box-loader.component';

describe('SkeletonBoxLoaderComponent', () => {
  let component: SkeletonBoxLoaderComponent;
  let fixture: ComponentFixture<SkeletonBoxLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonBoxLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonBoxLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
