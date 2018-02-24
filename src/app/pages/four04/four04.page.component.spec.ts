import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Four04PageComponent} from './four04.page.component';

describe('Four04PageComponent', () => {
  let component: Four04PageComponent;
  let fixture: ComponentFixture<Four04PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Four04PageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Four04PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
