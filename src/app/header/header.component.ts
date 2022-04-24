import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtTokenService } from '../jwt-token.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public userService: UserService,
    private jwt: JwtTokenService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  logOut() {
    this.jwt.removeToken();
    this.userService.setIsConnected(true);
    this.router.navigate(['/']);
  }
}
