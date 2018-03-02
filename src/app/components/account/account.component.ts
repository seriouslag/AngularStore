import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @Input()
  isStartExpanded: false;

  @Input()
  user: User;

  isAuth$: BehaviorSubject<boolean>;
  isAdmin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAuth$ = this.authService.isAuth$;
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }
}
