import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint: string;

  constructor(private http: HttpClient, private router: Router) {
    this.endpoint = 'http://' + window.location.hostname + ':3000/api';
  }

  signUp(user): any {
    return this.http.post<any>(`${this.endpoint}/user/signup`, user);
  }

  signIn(user): any {
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
