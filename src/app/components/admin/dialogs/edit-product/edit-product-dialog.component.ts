import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../../../interfaces/product';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../services/api.service';
import {AuthService} from '../../../../services/auth.service';
import {ToastService} from '../../../../services/toast.service';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductOptionDialogComponent implements OnInit, OnChanges {

  product: Product;
  apiService: ApiService;
  authService: AuthService;
  adminService: AdminService;
  toastService: ToastService;


  public productForm: FormGroup = new FormGroup({
    id: new FormControl({value: null, disabled: true}, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    productDescription: new FormControl(null, []),
    createdDate: new FormControl({value: null, disabled: true}, []),
    lastModified: new FormControl({value: null, disabled: true}, []),
    isVisible: new FormControl(null, []),
  });

  constructor(public dialogRef: MatDialogRef<EditProductOptionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.product) {
      this.product = this.data.product;
      this.setFormData();
    }
    if (this.data.apiService) {
      this.apiService = this.data.apiService;
    }
    if (this.data.authService) {
      this.authService = this.data.authService;
    }
    if (this.data.adminService) {
      this.adminService = this.data.adminService;
    }
    if (this.data.toastService) {
      this.toastService = this.data.toastService;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'data') {
        this.product = this.data.product;
        this.setFormData();
        if (this.data.apiService) {
          this.apiService = this.data.apiService;
        }
        if (this.data.authService) {
          this.authService = this.data.authService;
        }
        if (this.data.adminService) {
          this.adminService = this.data.adminService;
        }
      }
    }
  }

  private setFormData(): void {
    this.productForm.controls['id'].patchValue(this.product.id);
    this.productForm.controls['name'].patchValue(this.product.name);
    this.productForm.controls['productDescription'].patchValue(this.product.productDescription);
    this.productForm.controls['createdDate'].patchValue(this.product.createdDate);
    this.productForm.controls['lastModified'].patchValue(this.product.lastModified);
    this.productForm.controls['isVisible'].patchValue(this.product.isVisible);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public isChanged(): boolean {
    return (this.productForm.controls['id'].value !== this.product.id || this.productForm.controls['name'].value !== this.product.name
      || this.productForm.controls['createdDate'].value !== this.product.createdDate || this.productForm.controls['productDescription'].value !== this.product.productDescription ||
      this.productForm.controls['lastModified'].value !== this.product.lastModified ||  this.productForm.controls['isVisible'].value !== this.product.isVisible);

  }

  deleteProduct() {
    this.apiService.deleteProduct(this.product.id, this.authService.userToken$.getValue()).subscribe(res => {
      if (res.ok) {
        this.toastService.open('Succesfully deleted ' + this.product.name);
      } else {
        // add more checks
        this.toastService.open('Failed to delete ' + this.product.name);
      }
      // should add prompt before deletion
      this.adminService.updateProducts();
      this.dialogRef.close();
    });
  }

  updateProduct() {
    const product = {
      id: this.productForm.controls['id'].value,
      name: this.productForm.controls['name'].value,
      productDescription: this.productForm.controls['productDescription'].value,
      isVisible: this.productForm.controls['isVisible'].value
    } as Product;
    this.apiService.updateProduct(this.product.id, product, this.authService.userToken$.getValue()).subscribe(res => {
      if (res.ok) {
        this.toastService.open('Succesfully updated ' + this.product.name);
      } else {
        // add more checks
        this.toastService.open('Failed to update ' + this.product.name);
      }
      this.adminService.updateProducts();
      this.dialogRef.close();
    });
  }
}
