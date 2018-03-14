import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../interfaces/product';
import {Observable} from 'rxjs/Observable';
import {DialogService} from '../../../services/dialog.service';
import {MatDialogRef} from '@angular/material';
import {EditProductOptionDialogComponent} from '../dialogs/edit-product/edit-product-dialog.component';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../services/auth.service';
import {ToastService} from '../../../services/toast.service';
import {AdminService} from '../../../services/admin.service';

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

  constructor(private dialogService: DialogService, private apiService: ApiService, private authService: AuthService,
              private toastService: ToastService, private adminService: AdminService) { }

  ngOnInit() {
  }

  open(product: Product) {
    this.dialogService.closeDialogs();
    this.editProductDialog = this.dialogService.openDialog(EditProductOptionDialogComponent, {
      data: {
        product: product,
        apiService: this.apiService,
        authService: this.authService,
        toastService: this.toastService,
        adminService: this.adminService
      },
      panelClass: 'panel'
    });
  }



}
