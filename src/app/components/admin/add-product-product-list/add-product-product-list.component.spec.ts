import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductProductListComponent } from './add-product-product-list.component';

describe('AddProductProductListComponent', () => {
  let component: AddProductProductListComponent;
  let fixture: ComponentFixture<AddProductProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
