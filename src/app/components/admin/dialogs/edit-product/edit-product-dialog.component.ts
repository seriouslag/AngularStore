import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../../../interfaces/product';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit, OnChanges {

  product: Product;


  public productForm: FormGroup = new FormGroup({
    id: new FormControl({value: null, disabled: true}, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    createdDate: new FormControl({value: null, disabled: true}, []),
    lastModified: new FormControl({value: null, disabled: true}, []),
    isVisible: new FormControl(null, []),
  });

  constructor(public dialogRef: MatDialogRef<EditProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.product) {
      this.product = this.data.product;
      this.setFormData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'data') {
        this.product = this.data.product;
        this.setFormData();
      }
    }
  }

  private setFormData(): void {
    this.productForm.controls['id'].patchValue(this.product.id);
    this.productForm.controls['name'].patchValue(this.product.name);
    this.productForm.controls['createdDate'].patchValue(this.product.createdDate);
    this.productForm.controls['lastModified'].patchValue(this.product.lastModified);
    this.productForm.controls['isVisible'].patchValue(this.product.isVisible);
  }

  public cancel(): void {
    this.dialogRef.close();
  }


  addProduct(product: Product) {
  }

  deleteProduct(id: number) {
  }

  updateProduct(product: Product) {
  }
}
