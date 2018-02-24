import {Component, OnDestroy} from '@angular/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {StateService} from './services/state.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from './services/auth.service';
import {User} from './interfaces/user';
import {ApiService} from './services/api.service';
import {Value} from './interfaces/value';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {


  private sideNavSubscription: Subscription;
  private userSubscription: Subscription;
  private dbUserSubscription: Subscription;

  public sideNav: boolean;
  public user: User;
  private resDefault = 'You are not authorized.';
  public res = this.resDefault;
  public resPending = false;

  private userToken: string;

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, private stateService: StateService,
              private authService: AuthService, private apiService: ApiService) {
    this.sideNavSubscription = this.stateService.sideNav.asObservable().subscribe(sideNav => {
      this.sideNav = sideNav;
    });

    this.dbUserSubscription = this.authService.user.subscribe(user => {
      this.res = this.resDefault;
      if (user != null && user !== {}) {
        user.getIdToken().then(token => {
            this.userToken = token;
          }
        );

        this.userSubscription = this.authService.dbUser.subscribe(dbUser => {
          // console.log('in user sub in title', dbUser, user === {});
          this.user = dbUser;
        });
      } else {
        // no user
        this.user = null;
        this.userToken = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.dbUserSubscription) {
      this.dbUserSubscription.unsubscribe();
    }
    if (this.sideNavSubscription) {
      this.sideNavSubscription.unsubscribe();
    }
  }

  public closeSideNav(): void {
    this.stateService.closeSideNav();
  }

  public testAuth(): void {
    if (this.userToken && this.user) {
      this.resPending = true;
      this.apiService.getApiAuthCheck(this.userToken).take(1).subscribe(result => {
        this.resPending = false;
        if (result != null) {
          result = result as Value;
          this.res = result.name;
        } else {
          this.res = 'Server Error :(';
          this.resPending = false;
        }
      });
    } else {
      this.res = this.resDefault;
      this.resPending = false;
      console.log('failed', this.userToken);
    }

  }
}
