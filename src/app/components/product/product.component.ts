import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isFailed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  lowestPrice = -1;

  @Input()
  product: Product;

  constructor() { }

  ngOnInit() {
    if (this.product) {
      this.getLowestPrice();
    }
  }


  ngOnChanges() {
    if (this.product) {
      this.isLoading$.next(false);
      this.isFailed$.next(true);
      this.getLowestPrice();
    } else {
      this.isLoading$.next(false);
      this.isFailed$.next(true);
    }
  }

  public getLowestPrice(): void {
    let lowNum = -1;
    for (const productOption of this.product.productOptions) {
      console.log(productOption.price);
      if (productOption.price < lowNum || lowNum === -1) {
        lowNum = productOption.price;
      }
    }

    this.lowestPrice =  lowNum;
  }

}
