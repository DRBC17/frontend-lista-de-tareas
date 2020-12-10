import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint: string;

  constructor(private http: HttpClient, private router: Router) {
    this.endpoint = 'https://' + window.location.hostname + ':3000/api';
  }

  signUp(user: User): Observable<string> {
    return this.http.post<any>(`${this.endpoint}/user/signup`, user);
  }

  signIn(user: User): Observable<string> {
    return this.http.post<any>(`${this.endpoint}/user/signin`, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/tasks']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
