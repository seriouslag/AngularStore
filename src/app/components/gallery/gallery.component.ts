import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Image} from '../../interfaces/image';
import {DialogService} from '../../services/dialog.service';
import {ImageComponent} from '../dialogs/image/image.component';
import {MatDialogRef} from '@angular/material';

import 'rxjs/add/operator/take';
import {ApiService} from '../../services/api.service';
import {DomSanitizer} from '@angular/platform-browser';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

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

  isLoading$ = new BehaviorSubject<boolean>(false);
  isFailed$ = new BehaviorSubject<boolean>(false);

  private dialog: MatDialogRef<ImageComponent>;

  constructor(private dialogService: DialogService, private apiService: ApiService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'image') {
        this.getImageById();
      }
    }
  }

  private getImageById(): void {
    if (this.image) {
      this.isLoading$.next(true);
      this.apiService.getImageFileByImageId(this.image.id).take(1).subscribe(src => {
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
    this.dialog = this.dialogService.openDialog(ImageComponent, {
      height: '100%',
      width: '100%',
      panelClass: 'panel',
      hasBackdrop: true,
      backdropClass: 'panel',
      data: {
        apiService: this.apiService,
        image: this.image,
        text: ""
      } as ImageDialog
    });
  }
}

interface ImageDialog {
  image: Image;
  apiService: ApiService;
  text: string;
}
