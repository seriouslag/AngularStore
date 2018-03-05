import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiService} from '../../services/api.service';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isFailed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  lowestPrice = -1;
  imageSrc: SafeUrl;

  @Input()
  product: Product;

  @Input()
  size: number;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (this.product) {
      this.getLowestPrice();
      this.isLoading$.next(true);
      this.apiService.getThumbImageUriFromProduct(this.product).then(imageSrc => {
        this.imageSrc = imageSrc;
      });
      /* .then(imageSrc => {
        this.isLoading$.next(false);
        this.imageSrc = imageSrc;
        if (this.imageSrc) {
          this.isFailed$.next(false);
        } else {
          this.isFailed$.next(true);
        }
      });*/
    }
  }

  ngOnChanges() {
    if (this.product) {
      this.isLoading$.next(true);
      this.getLowestPrice();
      this.apiService.getThumbImageUriFromProduct(this.product).then(imageSrc => {
        this.imageSrc = imageSrc;
      });
      /* .then(imageSrc => {
        this.isLoading$.next(false);
        this.imageSrc = imageSrc;
        if (this.imageSrc) {
          this.isFailed$.next(false);
        } else {
          this.isFailed$.next(true);
        }
      });*/
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
