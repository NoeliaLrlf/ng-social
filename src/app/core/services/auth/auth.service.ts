import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { User } from '../../models/user';

interface TokenData {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  login(userData: User): Observable<TokenData> {
    return this.http
      .post<TokenData>('http://localhost:3000/auth/login', userData)
      .pipe(tap((tokenData) => this.saveToken(tokenData.access_token)));
  }

  signup(userData: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/auth/signup', userData);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('ngsocial_auth_token');
    }

    return false;
  }

  private saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('ngsocial_auth_token', token);
    }
  }
}
