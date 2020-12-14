import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestorePassword } from '../models/restore-password';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint: string;

  constructor(private http: HttpClient, private router: Router) {
    this.endpoint = 'http://' + window.location.hostname + ':3000/api';
  }

  signUp(user: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/user/signup`, user);
  }

  signIn(user: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/user/signin`, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  //* Correos
  confirmation(token: string): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/token/confirmation/${token}`,
      {}
    );
  }
  confirmationEmail(restorePassword: RestorePassword): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/token/send_confirmation`, {
      email: restorePassword.email,
    });
  }
  //send_confirmation
  restorePassword(restorePassword: RestorePassword): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/token/send_restore_password`, {
      email: restorePassword.email,
    });
  }

  verifiedToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/token/verified_token/${token}`);
  }

  changePassword(
    token: string,
    restorePassword: RestorePassword
  ): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/token/restore_password/${token}`,
      { password: restorePassword.password }
    );
  }
}
