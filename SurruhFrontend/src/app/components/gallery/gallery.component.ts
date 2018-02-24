import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Image} from '../../interfaces/image';
import {DialogService} from '../../services/dialog.service';
import {ImageComponent} from '../dialogs/image/image.component';
import {MatDialogRef} from '@angular/material';

import 'rxjs/add/operator/take';
import {ApiService} from '../../services/api.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {

  @Input() image: Image;
  @Input() height = 100;
  @Input() width = 100;
  @Input() size = 0;

  imageSrc: any;

  loading = false;
  failed = false;

  private dialog: MatDialogRef<ImageComponent>;

  constructor(private dialogService: DialogService, private apiService: ApiService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'image' && this.image) {
        this.loading = true;
        this.apiService.getImageFileByImageId(this.image.imageId).take(1).subscribe(src => {
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
  }

  open() {
    this.dialogService.closeDialogs();
    this.dialog = this.dialogService.openDialog(ImageComponent, {
      height: '100%',
      width: '100%',
      panelClass: 'panel',
      hasBackdrop: true,
      backdropClass: 'panel',
      data: {
        image: this.image,
        apiService: this.apiService
      }
    });
  }
}
