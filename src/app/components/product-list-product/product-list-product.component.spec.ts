import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListProductComponent } from './product-list-product.component';

describe('ProductListProductComponent', () => {
  let component: ProductListProductComponent;
  let fixture: ComponentFixture<ProductListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
