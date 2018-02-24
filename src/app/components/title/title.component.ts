import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {AuthService} from '../../services/auth.service';

import {DialogService} from '../../services/dialog.service';
import {StateService} from '../../services/state.service';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input()
  user: User;

  constructor(private authService: AuthService, private dialogService: DialogService, private stateService: StateService) {

  }

  ngOnInit() {
  }

  public openSideNav(): void {
    this.stateService.openSideNav();
  }

}
