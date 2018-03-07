import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Product} from '../../interfaces/product';

import 'rxjs/add/operator/take';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AdminService} from '../../services/admin.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.component.html',
  styleUrls: ['./admin.page.component.css'],
  providers: []
})
export class AdminPageComponent implements OnInit, OnDestroy {
  productSearchForm = new FormControl(null);
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  listProducts: Observable<Product[]>;
  filteredProducts: Observable<Product[]>;


  private productSubscription: Subscription;

  constructor(private apiService: ApiService, private adminService: AdminService) {
    this.filteredProducts = this.productSearchForm.valueChanges
      .pipe(
        map(term => this.filterProducts(term))
      );

    this.listProducts = this.products.asObservable();

  }

  ngOnInit() {
    this.productSubscription = this.adminService.products$.subscribe(p => {
      this.products.next(p);
      console.log('updated products');
      this.listProducts = Observable.of(this.filterProducts(this.productSearchForm.value));
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  search() {
    this.filteredProducts = Observable.of(this.filterProducts(this.productSearchForm.value));
    this.listProducts = this.filteredProducts;
  }

  reset() {
    this.filteredProducts = this.products;
    this.listProducts = this.products;
    this.productSearchForm.patchValue('');
  }

  /*
  TODO add ability to search by productOptions name
   */

  filterProducts(term: string): Product[] {
    return this.products.getValue().filter(product =>
      (product.name.toLowerCase().indexOf((term ? term : '').toLowerCase()) >= 0)).sort();
  }
}
