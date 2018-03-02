import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-image',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {

  imageSrc: any;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isFailed$ = new BehaviorSubject<boolean>(false);

  constructor(public dialogRef: MatDialogRef<ProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.data.product) {
      this.getImage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'data') {
        if (this.data.product) {
          this.getImage();
        }
      }
    }
  }

  private getImage(): void {
    if (this.data.product) {
      this.isLoading$.next(true);
      this.data.apiService.getImageFileByImageId(this.data.product.productOptions[0].images[0].id).take(1).subscribe(src => {
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
