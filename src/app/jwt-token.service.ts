import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenObject } from './interface';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {
  jwtToken?: string | null;
  decodedToken?: { [key: string]: string };

  constructor() {}

  getToken() {
    return localStorage.getItem('TOKEN');
  }
  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
      localStorage.setItem('TOKEN', token);
    }
  }
  removeToken() {
    this.jwtToken = null;
    localStorage.removeItem('TOKEN');
  }

  decodeToken() {
    const token = localStorage.getItem('TOKEN');
    if (typeof token === 'string') {
      return <TokenObject>jwt_decode(token);
    }
    return null;
  }
}
