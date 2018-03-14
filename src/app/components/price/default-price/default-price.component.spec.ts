import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPriceComponent } from './default-price.component';

describe('DefaultPriceComponent', () => {
  let component: DefaultPriceComponent;
  let fixture: ComponentFixture<DefaultPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
