import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DialogService} from '../../services/dialog.service';
import {ProductComponent} from '../dialogs/product/product.component';
import {MatDialogRef} from '@angular/material';

import 'rxjs/add/operator/take';
import {ApiService} from '../../services/api.service';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {

  @Input() product: Product;
  @Input() height = 100;
  @Input() width = 100;
  @Input() size = 0;

  imageSrc: any;

  isLoading$ = new BehaviorSubject<boolean>(false);
  isFailed$ = new BehaviorSubject<boolean>(false);

  private dialog: MatDialogRef<ProductComponent>;

  constructor(private dialogService: DialogService, private apiService: ApiService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'product') {
        this.getImage();
      }
    }
  }

  private getImage(): void {
    if (this.product) {
      this.isLoading$.next(true);
      this.apiService.getImageFileByImageId(this.product.productOptions[0].images[0].id).take(1).subscribe(src => {
        if (src != null) {
          const urlCreator = window.URL;
          this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(src));
          this.isFailed$.next(false)
        }
        this.isLoading$.next(false);
      }, () => {
        this.isLoading$.next(false);
        this.isFailed$.next(true);
      });
    } else {
      this.isLoading$.next(false);
      this.isFailed$.next(true);
    }
  }

  open() {
    this.dialogService.closeDialogs();
    this.dialog = this.dialogService.openDialog(ProductComponent, {
      height: '100%',
      width: '100%',
      panelClass: 'panel',
      hasBackdrop: true,
      backdropClass: 'panel',
      data: {
        apiService: this.apiService,
        product: this.product
      } as ImageDialog
    });
  }
}

interface ImageDialog {
  product: Product;
  apiService: ApiService;
}
