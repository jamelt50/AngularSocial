import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm = this.formBuilder.group({
    email: '' as string,
    pseudo: '' as string,
    avatar: '' as string,
    password: '' as string,
    password_confirm: '' as string,
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngRegister() {
    const data = this.registerForm.value;
    this.userService
      .addUser(data.pseudo, data.email, data.password, data.avatar)
      .subscribe((data) => console.log(data));
    this.router.navigate(['/']);
  }
  ngOnInit(): void {}
}
