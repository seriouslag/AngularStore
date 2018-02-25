import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Image} from '../interfaces/image';
import {Value} from '../interfaces/value';

import 'rxjs/add/operator/timeout';

@Injectable()
export class ApiService {

  private imageUrl = '/api/image/';
  private imageFileUrl = '/api/image/file/';
  private userUrl = '/api/user';
  private adminCheckUrl = '/api/user/admin';

  constructor(private httpClient: HttpClient) {
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

  getImages(): Observable<Image[]> {
    return this.httpClient
      .get<Image[]>(this.imageUrl, {headers: ApiService.getHeaders()});
  }

  getImageById(id: number): Observable<Image> {
    return this.httpClient
      .get<Image>(this.imageUrl + id, {headers: ApiService.getHeaders()});
  }

  getImageFileByImageId(imageID: number): Observable<Blob> {
    const options = {headers: ApiService.getImageHeaders(), responseType: 'blob' as 'blob'};
    return this.httpClient
      .get(this.imageFileUrl + imageID, options);
  }

  getApiAuthCheck(token: string): Observable<Value> {
    return this.httpClient
      .get<Value>(this.userUrl, {headers: ApiService.getAuthHeaders(token)});
  }

  getIsAdminStatus(token: string): Observable<boolean> {
    return this.httpClient
      .get<boolean>(this.adminCheckUrl, {headers: ApiService.getAuthHeaders(token)})
  }
}
