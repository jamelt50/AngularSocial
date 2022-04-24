import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtTokenService } from '../jwt-token.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenService: JwtTokenService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  ngLogin() {
    const that = this;
    this.userService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next(data) {
          that.tokenService.setToken(data.token);
        },
      });

    this.userService.setIsConnected(true);
    this.router.navigate(['utilisateurs']);
  }
}
