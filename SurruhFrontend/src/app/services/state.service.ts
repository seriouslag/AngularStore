import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StateService {

  public sideNav = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  public openSideNav() {
    this.sideNav.next(true);
  }

  public closeSideNav() {
    this.sideNav.next(false);
  }
}
