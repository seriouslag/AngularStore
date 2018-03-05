import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../interfaces/product';
import {Observable} from 'rxjs/Observable';
import {DialogService} from '../../../services/dialog.service';
import {MatDialogRef} from '@angular/material';
import {EditProductOptionDialogComponent} from '../dialogs/edit-product/edit-product-dialog.component';

@Component({
  selector: 'app-add-product-product-list',
  templateUrl: './add-product-product-list.component.html',
  styleUrls: ['./add-product-product-list.component.css']
})
export class AddProductProductListComponent implements OnInit {

  /*
  TODO rename file to AdminProductListComponent
   */

  @Input()
  products: Observable<Product[]>;

  private editProductDialog: MatDialogRef<EditProductOptionDialogComponent>;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  open(product: Product) {
    this.dialogService.closeDialogs();
    this.editProductDialog = this.dialogService.openDialog(EditProductOptionDialogComponent, {
      data: {
        product: product
      }
    });
  }



}
