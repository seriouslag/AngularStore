import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {Product} from '../../interfaces/product';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductOption} from '../../interfaces/productOption';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.component.html',
  styleUrls: ['./admin.page.component.css']
})
export class AdminPageComponent implements OnInit {

  postProductForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    productDescription: new FormControl(null, [Validators.required, Validators.minLength(1)])
  });

  postProductFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    productDescription: new FormControl(null, [Validators.required, Validators.minLength(1)])
  });

  postProductOptionFormGroup: FormGroup = new FormGroup({
    productOptions: new FormArray([])
  });
  /*{
    name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    price: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    productOptionDescription: new FormControl(null, [Validators.required, Validators.minLength(1)])
  });*/

  productOptions: ProductOption[];

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
  }

  async postProduct(): Promise<object> {
    const productTest = <Product>{
      name: this.postProductForm.controls['name'].value,
      productDescription: this.postProductForm.controls['productDescription'].value
    };

    return this.apiService.postProduct(await this.authService.user$.getValue().getIdToken(), productTest).toPromise();
  }

  get productOptionsArray(): FormArray {
    return (<FormArray>this.postProductOptionFormGroup.controls['productOptions']);
  }

  addProductOption(): void {
    this.productOptionsArray.push(new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      price: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      productOptionDescription: new FormControl(null, [Validators.required, Validators.minLength(1)])
    }));
  }

}
