import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {FirebaseService} from './firebase.service';
import {User} from '../interfaces/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiService} from './api.service';


@Injectable()
export class AuthService {

  public isAuth$ = new BehaviorSubject<boolean>(null);

  public user$ = new BehaviorSubject<firebase.User>(null);
  public userToken$ = new BehaviorSubject<string>('');

  public isAdmin$ = new BehaviorSubject<boolean>(null);
  /*public _admin: Observable<boolean> = this.isAdmin$.pipe(
    skipWhile((boolean) => {
      return boolean === null;
    })
  );*/

  user: Observable<firebase.User>;
  dbUser: Observable<any> = Observable.of({});

  userSubscription: Subscription;

  constructor(private auth: AngularFireAuth, private snackBar: MatSnackBar, private firebaseService: FirebaseService, private apiService: ApiService) {
    this.user = auth.authState;
    auth.auth.setPersistence('local');



    this.userSubscription = this.user.subscribe((user: firebase.User) => {
      this.user$.next(user);
      if (!(user != null && user.uid != null)) {
        this.dbUser = Observable.of(null);
      } else {
        this.dbUser = this.firebaseService.getFromDb('users/' + user.uid).valueChanges().take(1) as Observable<User>;
        this.updateUserStatus().subscribe(isAdmin => {
          this.isAdmin$.next(isAdmin);
        });
      }
    });
    /*this.updateUserStatus().then(a => {
      console.log(a);
    });*/
  }

  /*
    TODO reenable and remove async/promise/return observable and set admin guard to take observable
   */

  public updateUserStatus(): Observable<boolean> {
    return this.user.flatMap(user => {
      this.user$.next(user);
      if (!(user != null && user.uid != null)) {
        this.dbUser = Observable.of(null);
        return Observable.of(null);
      } else {
        this.dbUser = this.firebaseService.getFromDb('users/' + user.uid).valueChanges().take(1) as Observable<User>;
        return Observable.fromPromise(this.user$.getValue().getIdToken()).flatMap(token => {
          this.userToken$.next(token);
          this.apiService.getIsAuthStatus(this.userToken$.getValue()).take(1).subscribe(isAuth => {
            this.isAuth$.next(isAuth);
          });
          return this.apiService.getIsAdminStatus(this.userToken$.getValue());
        });
      }
    });
      /*.toPromise().then(status => {
        console.log('status', status);
        this.isAdmin$.next(status[0]);
        this.isAuth$.next(status[1]);
        this.loading = true;
        return this.isAdmin$.getValue();
      });

    // Get User Id Token
     await this.userToken$.next((await this.user$.getValue().getIdToken()));

    // Get Auth status from backend
     await this.apiService.getIsAuthStatus(this.userToken$.getValue()).subscribe(status => {
       this.isAuth$.next(status);
     });

    // Get Admin status from backend
     return await this.apiService.getIsAdminStatus(this.userToken$.getValue()).toPromise().then(status => {
      this.isAdmin$.next(status);

      return this.isAdmin$.getValue();
     });*/
  }

  public loginWithEmailProvider(email: string, password: string): Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(email, password).then((user) => {
      // Login successful

      // Handle toast here?
      if (user.displayName) {
        this.snackBar.open('Logged in as ' + user.displayName, 'OK', {duration: 1750});
      } else if (user.email) {
        this.snackBar.open('Logged in as ' + user.email, 'OK', {duration: 1750});
      } else {
        this.snackBar.open('Successfully logged in', 'OK', {duration: 1750});
      }
    }).catch((error: any) => {

      // const errorCode = error.code;
      // Login Failed

      this.snackBar.open(error.message, 'OK', {
        duration: 2000,
      });
    });
  }

  public logout(): void {
    /*this.userSubscription.unsubscribe();
    this.user = Observable.of(null);
    this.dbUser = Observable.of(null);*/

    this.auth.auth.signOut().then(() => {

      this.snackBar.open('Successfully logged out.', 'OK', {duration: 1750});
    }, () => {
      this.snackBar.open('Something went wrong :(', 'OK', {duration: 1750});
    });
  }

  public saveUserToDB(user: User): Promise<void> {
    if (user && user.uid) {
      return this.firebaseService.saveToDB(('users/' + user.uid), user);
    }
  }

  public createUserFromEmail(email: string, password: string, fname: string, lname: string): Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(email, password).then((response) => {
      if (response) {
        this.saveUserToDB({
          email: email, fname: fname, lname: lname,
          bio: '', job: '', company: '', twitter: '',
          facebook: '', instagram: '', twitch: '', youtube: '',
          google: '', uid: response.uid, linkedin: '',
          dateCreated: Date.now().toString(), image: '', isVerified: false
        }).then(() => {
          this.sendEmailVerification();

        }).catch(() => {
          this.snackBar.open('Failed to create your account please try again.', 'OK', {duration: 3000});
        });
      } else {
        console.log('The response from creating a user is', null);
      }
      return response;

    }).catch((error: firebase.FirebaseError) => {
        if (error.code === 'auth/weak-password') {
          this.snackBar.open('Password is too weak', 'OK', {duration: 2000});
        } else if (error.code === 'auth/invalid-email') {
          this.snackBar.open('Email is invalid', 'OK', {duration: 2000});
        } else if (error.code === 'auth/email-already-in-use') {
          this.snackBar.open('This email is already in use', 'OK', {duration: 2000});
        } else if (error.code === 'auth/operation-not-allowed') {
          this.snackBar.open('This is not allowed at this time', 'OK', {duration: 2000});
        } else {
          this.snackBar.open('Cannot process, unknown error', 'OK', {duration: 2000});
        }
      }
    );
  }

  public sendEmailVerification(): void {
    this.auth.auth.currentUser.sendEmailVerification().then(() => {
      this.snackBar.open('A verification email has been sent to ' + this.auth.auth.currentUser.email, 'OK', {duration: 4000});
    }).catch(() => {
      this.snackBar.open('Failed to send a verification email please try again later.', 'OK', {duration: 4000});
    });
  }

}
