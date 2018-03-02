import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Product} from '../../interfaces/product';

import 'rxjs/add/operator/take';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.component.html',
  styleUrls: ['./admin.page.component.css']
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  productSearchForm = new FormControl(null);
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  listProducts: Observable<Product[]>;
  filteredProducts: Observable<Product[]>;


  constructor(private apiService: ApiService) {
    this.filteredProducts = this.productSearchForm.valueChanges
      .pipe(
        map(term => this.filterProducts(term))
      );

    this.listProducts = this.products;
    this.apiService.getProducts().subscribe(p => {
      this.products.next(p);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
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

  filterProducts(term: string): Product[] {
    return this.products.getValue().filter(product =>
      product.name.toLowerCase().indexOf(term.toLowerCase()) >= 0).sort();
  }


  // Can remove
  // Also remove from html
  selectRow(row) {
    console.log(row);
  }
}
