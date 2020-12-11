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
  confirmationEmail(token: string): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/token/confirmation/${token}`,
      {}
    );
  }

  restorePassword(user: RestorePassword): Observable<any> {
    console.log(user.email);

    return this.http.post<any>(`${this.endpoint}/token/send_restore_password`, {
      email: user.email,
    });
  }
}
