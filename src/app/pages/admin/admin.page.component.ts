import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {Product} from '../../interfaces/product';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.component.html',
  styleUrls: ['./admin.page.component.css']
})
export class AdminPageComponent implements OnInit {

/*  postProductForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    productDescription: new FormControl(null, [Validators.required, Validators.minLength(1)])
  });*/

  postProductFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    productDescription: new FormControl(null, [])
  });

  postProductOptionFormGroup: FormGroup = new FormGroup({
    productOptions: new FormArray([])
  });

  openId = -1;



  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
  }

  async postProduct(): Promise<object> {
    const product = <Product>{
      name: this.postProductFormGroup.controls['name'].value,
      productDescription: this.postProductFormGroup.controls['productDescription'].value
    };

    return this.apiService.postProduct(await this.authService.user$.getValue().getIdToken(), product).toPromise();
  }

  get productOptionsFormArray(): FormArray {
    return this.postProductOptionFormGroup.get('productOptions') as FormArray;
  };

  addProductOption(): void {
    this.productOptionsFormArray.push(new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      price: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      productOptionDescription: new FormControl(null, [])
    }));
  }

  opened(i: number) {
    this.openId = i;
    console.log(i);
  }

}
