import {Component, OnDestroy, OnInit} from '@angular/core';
import {Image} from '../../interfaces/image';
import {Subscription} from 'rxjs/Subscription';

import 'rxjs/add/operator/mergeMap';
import {ObservableMedia} from '@angular/flex-layout';
import {ApiService} from '../../services/api.service';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.page.component.html',
  styleUrls: ['./gallery.page.component.css']
})
export class GalleryPageComponent implements OnInit, OnDestroy {

  imageSubscription: Subscription;
  gallery: Image[];
  size = 0;

  public isLoading$ = new BehaviorSubject<boolean>(false);

  private mediaSubscription: Subscription;

  private gallerySubscription: Subscription;

  constructor(private apiService: ApiService, public media: ObservableMedia) {
  }

  ngOnInit() {
    this.isLoading$.next(true);
    this.gallerySubscription = this.apiService.getImages().subscribe(gallery => {
      this.isLoading$.next(false);
      this.gallery = gallery;
    });
    this.mediaSubscription = this.media.subscribe(() => {
      this.checkMobile();
    });
  }

  ngOnDestroy(): void {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
    if (this.gallerySubscription) {
      this.gallerySubscription.unsubscribe();
    }
    if (this.mediaSubscription) {
      this.mediaSubscription.unsubscribe();
    }
  }

  private checkMobile() {
    if (this.media.isActive('xs')) {
      this.size = 0;
    } else if (this.media.isActive('sm')) {
      this.size = 1;
    } else {
      this.size = 2;
    }
  }
}
