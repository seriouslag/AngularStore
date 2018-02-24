import {Inject, Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject, PathReference} from 'angularfire2/database';
import {Image} from '../interfaces/image';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {FirebaseApp} from 'angularfire2';

import 'rxjs/add/observable/forkJoin';
import ThenableReference = firebase.database.ThenableReference;

@Injectable()
export class FirebaseService {
  gallery: Observable<Image[]>;
  galleryRef: AngularFireList<Image>;

  public storage: any;
  public storageRef: any;

  public storageGalleryRef: any;

  constructor(@Inject(FirebaseApp) firebaseApp: any, private db: AngularFireDatabase) {

    this.storage = firebaseApp.storage();
    this.storageRef = this.storage.ref();

    this.storageGalleryRef = this.storageRef.child('gallery');
  }

  public addImageToGallery(image: Image): ThenableReference {
    if (image) {
      return this.galleryRef.push(image);
    }
  }

  public getGalleryImageByName(name: string): Observable<string> {
    return Observable.fromPromise(this.storageGalleryRef.child(name).getDownloadURL());
  }

  public updateImageInGallery(key: string, image: Image): Promise<void> {
    if (key && image) {
      return this.galleryRef.update(key, image);
    } else if (image) {
      return new Promise((resolve, reject) => {
        reject('Specified Key was undefined.');
      });
    } else {
      return new Promise((resolve, reject) => {
        reject('Specified Photo was undefined.');
      });
    }
  }

  public getFromDb(location: PathReference): AngularFireObject<any> {
    return this.db.object(location);
  }

  public saveToDB(location: PathReference, object: any): Promise<void> {
    return this.db.object(location).set(object);
  }
}
