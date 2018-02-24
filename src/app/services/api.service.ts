import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Image} from '../interfaces/image';
import {Value} from '../interfaces/value';

import 'rxjs/add/operator/timeout';

@Injectable()
export class ApiService {

  private imageUrl = '/api/images/';
  private imageDataUrl = '/api/imageData';
  private userUrl = '/api/user';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  private static getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders()
    // .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', 'localhost:5000')
      .set('Authorization', 'Bearer ' + token);
  }

  private static getImageHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/octet-stream')
      .set('Access-Control-Allow-Origin', 'localhost:5000');
  }

  private static getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', 'localhost:5000');
  }

  getImageById(id: number): Observable<Image> {
    return this.httpClient
      .get<Image>(this.imageUrl + id, {headers: ApiService.getHeaders()});
  }

  getImageData(): Observable<Image[]> {
    return this.httpClient
      .get<Image[]>(this.imageDataUrl, {headers: ApiService.getHeaders()});
  }

  getImageDataById(id: number): Observable<Image> {
    return this.httpClient
      .get<Image>(this.imageDataUrl + id, {headers: ApiService.getHeaders()});
  }

  getImageFileByImageId(imageID: number): Observable<Blob> {
    const options = {headers: ApiService.getImageHeaders(), responseType: 'blob' as 'blob'};
    return this.httpClient
      .get(this.imageUrl + imageID, options);
  }

  getApiAuthCheck(token: string): Observable<Value> {
    return this.httpClient
      .get<Value>(this.userUrl, {headers: ApiService.getAuthHeaders(token)});
  }
}
