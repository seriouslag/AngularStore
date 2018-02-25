import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnChanges {

  imageSrc: any;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isFailed$ = new BehaviorSubject<boolean>(false);

  constructor(public dialogRef: MatDialogRef<ImageComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.data.image) {
      this.getImageSrcByName();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'data') {
        if (this.data.image) {
          this.getImageSrcByName();
        }
      }
    }
  }

  private getImageSrcByName(): void {
    if (this.data.image) {
      this.isLoading$.next(true);
      this.data.apiService.getImageFileByImageId(this.data.image.id).take(1).subscribe(src => {
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

  close(): void {
    this.dialogRef.close();
  }

}
