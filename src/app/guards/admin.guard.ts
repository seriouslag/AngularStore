import {CanActivate} from "@angular/router";
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/first';

@Injectable()
export class AdminGuard implements  CanActivate {

  constructor(private apiService: ApiService, private authService: AuthService) {
  }

  async canActivate(): Promise<boolean> {
    // Get user
    return await this.authService.user.first().toPromise()
      .then(async user => {
        if(user != null && user != {}) {
          // Get user IdToken from firebase
          return await user.getIdToken()
            .then(async token => {
              // Get the admin status from backend
              return await this.apiService.getIsAdminStatus(token).toPromise();
          })
        }
    });
  }
}
