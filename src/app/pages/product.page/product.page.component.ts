import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-product.page',
  templateUrl: './product.page.component.html',
  styleUrls: ['./product.page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isFailed$ = new BehaviorSubject<boolean>(false);

  productSubscription: Subscription;
  paramSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params
      .subscribe(params => {
        this.getProduct(+params['productId']);
      });
  }

  getProduct(id: number): void {
    this.isLoading$.next(true);
    this.productSubscription = this.apiService.getProductById(id)
      .subscribe(
        (product) => {
            console.log(product);
            this.product = product;
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

}
