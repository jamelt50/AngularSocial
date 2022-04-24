import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserObject, TokenObject } from './interface';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isConnected: boolean = false;

  urlBase = 'https://reseau.jdedev.fr/api/user';
  httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private tokenService: JwtTokenService) {
    if (this.tokenService.getToken()) {
      this.setIsConnected(true);
    }
  }

  loginUser(email: string, password: string): Observable<TokenObject> {
    return this.http
      .post<TokenObject>(
        this.urlBase + '/connect',
        { email, password },
        this.httpOptions
      )
      .pipe(tap((token: TokenObject) => token));
  }

  getAllUser(): Observable<Array<UserObject>> {
    const token = this.tokenService.getToken();

    return this.http
      .get<Array<UserObject>>(this.urlBase, {
        headers: {
          Authorization: 'Bearer' + ' ' + token,
        },
      })
      .pipe(tap((allUser: Array<UserObject>) => allUser));
  }

  addUser<UserObject>(
    pseudo: string,
    email: string,
    password: string,
    avatar: string
  ) {
    return this.http
      .post<UserObject>(
        this.urlBase,
        { pseudo, email, password, avatar },
        this.httpOptions
      )
      .pipe(tap((data: UserObject) => data));
  }

  getIsConnected(): boolean {
    return this.isConnected;
  }

  setIsConnected(bool: boolean) {
    if (bool) {
      this.isConnected = !this.isConnected;
    }
  }
}
