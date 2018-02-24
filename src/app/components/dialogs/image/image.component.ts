import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnChanges {

  imageSrc: any;
  loading = true;
  failed = false;

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
      this.loading = true;
      this.data.apiService.getImageFileByImageId(this.data.image.imageID).take(1).subscribe(src => {
        console.log('make it here', src);
        if (src != null) {
          const urlCreator = window.URL;
          this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(src));
          this.failed = false;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
        this.failed = true;
      });
    } else {
      this.loading = false;
      this.failed = true;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
