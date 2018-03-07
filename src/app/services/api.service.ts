import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Image} from '../interfaces/image';
import {Value} from '../interfaces/value';

import 'rxjs/add/operator/timeout';
import {Product} from '../interfaces/product';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Injectable()
export class ApiService {

  private imageUrl = '/api/image/';
  private productUrl = 'api/product/';
  private imageFileUrl = '/api/image/file/';
  private userUrl = '/api/user';
  private adminCheckUrl = '/api/user/admin';
  private authCheckUrl = '/api/user/auth';

  private urlCreator = window.URL;

  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) {
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

  getProducts(token?: string): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(this.productUrl, {headers: ((token != null) ? ApiService.getAuthHeaders(token) : ApiService.getHeaders())});
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient
      .get<Product>(this.productUrl + '/' + id, {headers: ApiService.getHeaders()});
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
      .get<boolean>(this.adminCheckUrl, {headers: ApiService.getAuthHeaders(token)});
  }

  getIsAuthStatus(token: string): Observable<boolean> {
    return this.httpClient
      .get<boolean>(this.authCheckUrl, {headers: ApiService.getAuthHeaders(token)});
  }

  postProduct(product: Product, token: string): Observable<HttpResponse<Response>> {
      return this.httpClient
        .post<Response>(this.productUrl, product, {observe: 'response', headers: ApiService.getAuthHeaders(token)});
  }

  deleteProduct(id: number, token: string): Observable<HttpResponse<Response>> {
    return this.httpClient
      .delete<Response>(this.productUrl + id, {observe: 'response', headers: ApiService.getAuthHeaders(token)});
  }

  updateProduct(id: number, product: Product, token: string): Observable<HttpResponse<Response>> {
    return this.httpClient
      .put<Response>(this.productUrl + id, product, {observe: 'response', headers: ApiService.getAuthHeaders(token)});
  }

  async getThumbImageUriFromProduct(product: Product): Promise<SafeUrl> {
    if (product && product.productOptions && product.productOptions[0].images) {
      return await this.getImageFileByImageId(product.productOptions[0].images[0].id).take(1).toPromise().then(async src => {
        return await this.domSanitizer.bypassSecurityTrustUrl(this.urlCreator.createObjectURL(src));
      });
    } else {
      return '' as SafeUrl;
    }
  }
}
