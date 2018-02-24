import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user';

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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }
}
