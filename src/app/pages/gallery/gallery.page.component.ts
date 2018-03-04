import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import 'rxjs/add/operator/mergeMap';
import {ObservableMedia} from '@angular/flex-layout';
import {ApiService} from '../../services/api.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Product} from '../../interfaces/product';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.page.component.html',
  styleUrls: ['./gallery.page.component.css']
})
export class GalleryPageComponent implements OnInit, OnDestroy {

  imageSubscription: Subscription;
  gallery: Product[];
  size = 0;

  public isLoading$ = new BehaviorSubject<boolean>(false);

  private mediaSubscription: Subscription;

  private gallerySubscription: Subscription;

  constructor(private apiService: ApiService, public media: ObservableMedia) {
  }

  ngOnInit() {
    this.isLoading$.next(true);
    this.gallerySubscription = this.apiService.getProducts().subscribe(gallery => {
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
