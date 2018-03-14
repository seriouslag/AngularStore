import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Image} from '../../interfaces/image';
import {MatTabChangeEvent} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-product.page',
  templateUrl: './product.page.component.html',
  styleUrls: ['./product.page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;



  isLoading$ = new BehaviorSubject<boolean>(false);
  isFailed$ = new BehaviorSubject<boolean>(false);

  images: Image[] = [];


  selectedProductOption = 0;
  selectedProductOptionImage = 0;

  selectedImage: Observable<SafeUrl>;

  productSubscription: Subscription;
  paramSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params
      .subscribe(params => {
        this.getProduct(+params['productId'], +params['productOptionId']);
      });
  }

  getProduct(productId: number, optionId: number): void {
    this.isLoading$.next(true);
    this.productSubscription = this.apiService.getProductById(productId)
      .subscribe(
        (product) => {
            this.product = product;
            this.images = this.getImagesFromProduct(product);

            this.selectedProductOption = this.getTabNumber(optionId);
            if (this.images && this.images[this.selectedProductOption]) {
              this.selectedImage = this.getImage(product.productOptions[this.selectedProductOption].images[this.selectedProductOptionImage].id);
            } else {
              this.selectedImage = null;
              console.log('null');
            }
            this.isFailed$.next(false);
            this.isLoading$.next(false);
          },
        (/*maybe do a log*/) => {
          this.isFailed$.next(true);
          this.isLoading$.next(false);
        });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }

  private getImagesFromProduct(product: Product): Image[] {
    const images: Image[] = [];
    for (const productOption of product.productOptions) {
      for (const image of productOption.images) {
        images.push(image);
      }
    }
    return images;
  }

  private getTabNumber(optionId: number): number {
    let i = 0;
    for (const productOption of this.product.productOptions) {
      if (optionId === productOption.id) {
         return i;
      }
      i++;
    }
    return 0;
  }

  selectedTabChanged(event: MatTabChangeEvent) {
    this.selectedProductOption = event.index;
    this.selectedProductOptionImage = 0;

    this.selectedImage = this.getImage(this.product.productOptions[event.index].images[this.selectedProductOptionImage].id);
  }

  getImage(id): Observable<SafeUrl> {
    return this.apiService.getImageUriFromImageId(id);
  }


}
