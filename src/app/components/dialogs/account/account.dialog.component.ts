import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../interfaces/user';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account.dialog.component.html',
  styleUrls: ['./account.dialog.component.css']
})
export class AccountDialogComponent implements OnInit, OnChanges {

  user: User;

  constructor(public dialogRef: MatDialogRef<AccountDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.user = this.data.user;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // when the aboutUser changes change the profile pic
    for (const propName in changes) {
      if (propName === 'data') {
        this.user = this.data.user;
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
