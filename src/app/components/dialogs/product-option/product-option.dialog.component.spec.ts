import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductOptionDialogComponent} from './product-option.dialog.component';

describe('ProductOptionDialogComponent', () => {
  let component: ProductOptionDialogComponent;
  let fixture: ComponentFixture<ProductOptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOptionDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
