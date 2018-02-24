import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GalleryOpenComponent} from './gallery-open.component';

describe('GalleryOpenComponent', () => {
  let component: GalleryOpenComponent;
  let fixture: ComponentFixture<GalleryOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryOpenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
