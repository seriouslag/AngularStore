import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {Product} from "../../interfaces/product";
import {ProductOption} from "../../interfaces/productOption";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.component.html',
  styleUrls: ['./admin.page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
  }

  async postProduct(): Promise<object> {
    const productTest = <Product>{
      name: 'Beans',
      tags: [],
      productDescription: "The more you eat,",
      productOptions: [<ProductOption>{
        price: 10.20,
        isVisible: true,
        name: 'Black',
        images: [],
        productOptionDescription: "Tasty!"

      }]
    };
    console.log('here');

    return this.apiService.postProduct(await this.authService.user$.getValue().getIdToken(), productTest).toPromise();
  }

}
