import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SafeUrl} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-large-image',
  templateUrl: './large-image.component.html',
  styleUrls: ['./large-image.component.css']
})
export class LargeImageComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  imageSrc: Observable<SafeUrl>;

  @Input()
  size: number;

  private imageSubscription: Subscription;
  private failedSubscription: Subscription;

  public isLoading$ = new BehaviorSubject<boolean>(true);
  public isFailed$ = new BehaviorSubject<boolean>(false);

  public img: SafeUrl;

  constructor() {
    if (this.imageSrc) {
      this.imageSubscription = this.imageSrc.subscribe(img => {
        this.img = img;
        if (img === null) {
          this.isFailed$.next(true);
        } else {
          this.isFailed$.next(false);
        }
        this.isLoading$.next(false);
      });
    } else {
      this.isLoading$.next(false);
      this.isFailed$.next(true);
    }

    this.failedSubscription = this.isFailed$.subscribe(isFailed => {
      console.log(isFailed);
      if (isFailed) {
        this.img = '/assets/images/INF.png';
      }
    });
  }

  ngOnChanges() {
    if (this.imageSrc) {
      this.imageSubscription = this.imageSrc.subscribe(img => {
        this.img = img;
        if (img === null) {
          this.isFailed$.next(true);
        } else {
          this.isFailed$.next(false);
        }
        this.isLoading$.next(false);
      });
    } else {
      this.isLoading$.next(false);
      this.isFailed$.next(true);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
