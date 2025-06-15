import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLineLoaderComponent } from './skeleton-line-loader.component';

describe('SkeletonLineLoaderComponent', () => {
  let component: SkeletonLineLoaderComponent;
  let fixture: ComponentFixture<SkeletonLineLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonLineLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonLineLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
