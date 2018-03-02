import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductStepperComponent } from './add-product-stepper.component';

describe('AddProductStepperComponent', () => {
  let component: AddProductStepperComponent;
  let fixture: ComponentFixture<AddProductStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
