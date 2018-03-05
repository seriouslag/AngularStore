import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-option.dialog.component.html',
  styleUrls: ['./product-optioon.dialog.component.css']
})
export class ProductOptionDialogComponent implements OnInit, OnChanges {

  @Input()
  imageSrc: any;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isFailed$ = new BehaviorSubject<boolean>(false);

  constructor(public dialogRef: MatDialogRef<ProductOptionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.data.productOption) {
      // this.getImage();
    }
    if (this.data) {
      this.setImage(this.data.imageSrc);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'data') {
        if (this.data.productOption) {
          // this.getImage();
        }
        if (this.data) {
          this.setImage(this.data.imageSrc);
        }
      }
    }
  }

  private setImage(imageSrc: string): void {
    if (imageSrc != null) {
      this.isFailed$.next(false);
      this.imageSrc = imageSrc;
    } else {
      this.isFailed$.next(true);
    }
  }

  private getImage(): void {
    if (this.data.productOption) {
      this.isLoading$.next(true);
      this.data.apiService.getImageFileByImageId(this.data.productOption.images[0].id).take(1).subscribe(src => {
        if (src != null) {
          const urlCreator = window.URL;
          this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(src));
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

  close(): void {
    this.dialogRef.close();
  }

}
