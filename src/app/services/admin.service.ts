import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Product} from '../interfaces/product';
import {ApiService} from './api.service';

@Injectable()
export class AdminService {

  public products$ = new BehaviorSubject<Product[]>([]);

  constructor(private apiService: ApiService) {
    this.updateProducts();
  }

  updateProducts(): void {
    this.apiService.getProducts().take(1).subscribe(products => {
      this.products$.next(products);
    });
  }

}
