import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.component.html',
  styleUrls: ['./admin.page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
  }

  async postProduct(product: Product): any {
    return this.apiService.postProduct(await this.authService.user$.getValue().getIdToken(), product);
  }

}
