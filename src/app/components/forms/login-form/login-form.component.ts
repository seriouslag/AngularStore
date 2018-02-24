import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, LoginFormComponent.validateEmail]),
    password: new FormControl(null, [Validators.required]),
  });


  constructor(private authService: AuthService) {
  }

  static validateEmail(fc: FormControl): any {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,12}))/i;

    return EMAIL_REGEXP.test(fc.value) ? null : {
      'email': true
    };
  }

  public loginWithEmail(): void {
    this.authService.loginWithEmailProvider(this.loginForm.controls['email'].value.toLowerCase(),
      this.loginForm.controls['password'].value);
  }

  ngOnInit(): void {
  }

}
