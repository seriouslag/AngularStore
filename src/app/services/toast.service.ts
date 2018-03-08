import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ToastService {

  private duration = 2000;
  private action = 'Ok';

  constructor(private snackBar: MatSnackBar) { }

  public open(message: string, action?: string, duration?: number): void {
    this.snackBar.open(message, (action ? action : this.action),
      {
        duration: (duration ? duration : this.duration)
      });
  }
}
