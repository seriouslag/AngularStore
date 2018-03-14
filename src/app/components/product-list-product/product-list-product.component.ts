import {Component, HostBinding, Input, OnChanges, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {SafeUrl} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-product-list-product',
  templateUrl: './product-list-product.component.html',
  styleUrls: ['./product-list-product.component.css']
})
export class ProductListProductComponent implements OnInit, OnChanges {
  // @HostBinding('attr.class') cssClass = 'size';

  @Input()
  product: Product;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isFailed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  lowestPrice = -1;
  imageSrc: SafeUrl;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (this.product) {
      this.getLowestPrice();
      this.isLoading$.next(true);
      this.imageSrc = this.apiService.getThumbImageUriFromProduct(this.product);
    }
  }

  ngOnChanges() {
    if (this.product) {
      this.isLoading$.next(true);
      this.getLowestPrice();
      this.imageSrc = this.apiService.getThumbImageUriFromProduct(this.product);
    } else {
      this.isLoading$.next(false);
      this.isFailed$.next(true);
    }
  }

  public getLowestPrice(): void {
    let lowNum = -1;
    for (const productOption of this.product.productOptions) {
      if (productOption.price < lowNum || lowNum === -1) {
        lowNum = productOption.price;
      }
    }

    this.lowestPrice =  lowNum;
  }

}
