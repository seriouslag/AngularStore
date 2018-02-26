import {Component, OnDestroy} from '@angular/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {StateService} from './services/state.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from './services/auth.service';
import {User} from './interfaces/user';
import {ApiService} from './services/api.service';
import {Value} from './interfaces/value';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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
  public res: string;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private userToken: string;

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, private stateService: StateService,
              private authService: AuthService, private apiService: ApiService) {
    this.res = this.resDefault;
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
      this.isLoading$.next(true);
      this.apiService.getApiAuthCheck(this.userToken).take(1).subscribe(result => {
        this.isLoading$.next(false);
        if (result != null) {
          result = result as Value;
          this.res = result.name;
        } else {
          this.res = 'Server Error :(';
          this.isLoading$.next(false);
        }
      });
    } else {
      if (this.user == null) {
        this.res = "Please try logging in to use this feature."
      } else {
        this.res = this.resDefault;
      }

      this.isLoading$.next(false);
    }

  }
}
