import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Product} from '../../../interfaces/product';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../services/auth.service';
import {MatExpansionPanel} from '@angular/material';
import {ToastService} from '../../../services/toast.service';
import {AdminService} from '../../../services/admin.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-product-stepper',
  templateUrl: './add-product-stepper.component.html',
  styleUrls: ['./add-product-stepper.component.css']
})
export class AddProductStepperComponent implements OnInit {

  postProductStepFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    productDescription: new FormControl(null, [])
  });

  postProductOptionFormGroup: FormGroup = new FormGroup({
    productOptions: new FormArray([])
  });

  // Can remove the toOpen system. [expanded] only fires onview load
  toOpen: boolean[] = [];

  @ViewChildren(MatExpansionPanel) panels: QueryList<MatExpansionPanel>;

  constructor(private apiService: ApiService, private authService: AuthService, private toastService: ToastService,
              private adminService: AdminService) { }

  ngOnInit() {
  }

  get productOptionsFormArray(): FormArray {
    return this.postProductOptionFormGroup.get('productOptions') as FormArray;
  }

  addProductOption(): void {
    this.productOptionsFormArray.push(new FormGroup({
      // Set the default value of the name to not throw an error for missing a value
      name: new FormControl(this.postProductStepFormGroup.controls['name'].value + ' ' + this.productOptionsFormArray.length, [Validators.required, Validators.minLength(1)]),
      price: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      productOptionDescription: new FormControl(null, [])
    }));
    this.toOpen.push(true);
  }

  public openErrorPanels(): boolean {
    let panelsOpen = false;
    if (this.panels && this.panels.length) {
      console.log(this.panels.toArray());
      const panels = this.panels.toArray();
      let i = 0;

      // Open any panels with errors to expose them
      for (const productOption of this.productOptionsFormArray.controls) {
        if (productOption.status === 'INVALID') {
          this.toOpen[i] = true;
          panelsOpen = true;

          panels[i].open();
        } else {
          this.toOpen[i] = false;
        }
        i++;
      }
    }
    return panelsOpen;
  }

  // Maybe remove. I do not like this system
  public checkToClose(i: number) {
    this.toOpen[i] = this.productOptionsFormArray.controls[i].status !== 'VALID';
    /*
    const panels = this.panels.toArray();
    if (this.productOptionsFormArray.controls[i].status !== 'VALID') {
    //  panels[i].open();
    }
    */
  }

  public clearForms() {
    this.postProductStepFormGroup.reset();
    this.productOptionsFormArray.controls.splice(0, this.productOptionsFormArray.controls.length);
    this.postProductOptionFormGroup.reset();
  }

  public postProduct() {
    const product = {
      name: this.postProductStepFormGroup.controls['name'].value,
      productDescription: this.postProductStepFormGroup.controls['productDescription'].value,
      productOptions: this.postProductOptionFormGroup.controls['productOptions'].value
    } as Product;
    this.apiService.postProduct(product, this.authService.userToken$.getValue()).subscribe(res => {
      if (res.ok) {
        this.toastService.open('Successfully added ' + product.name);
        this.clearForms();
        this.adminService.updateProducts();
      } else {
        this.toastService.open('Failed to add ' + product.name + '. Unknown');
      }
      }, ((httpError: HttpErrorResponse) => {
        this.toastService.open('Failed to add ' + product.name + '. ' + httpError.statusText);
      })
    );
  }
}
