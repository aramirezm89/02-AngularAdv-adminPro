import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginForm } from 'src/app/interfaces/loginForm';
import { LoginResponse } from 'src/app/interfaces/loginResponse';
import { RenewTokenResponse } from 'src/app/interfaces/renewTokenResponse';
import { environment } from 'src/environments/environment';

declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.base_url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  loginUsuario(formData: LoginForm): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/login`;

    return this.http.post<LoginResponse>(url, formData).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  loginGoogle(token: string) {
    const url = `${this.baseUrl}/auth/login/google`;
    return this.http.post(url, { token }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('x-token', token);

    return this.http.get<RenewTokenResponse>(url, { headers }).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        return response.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');

    this.ngZone.run(() => {
      google.accounts.id.revoke('aramirez.unimarc@gmail.com', (done: any) => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
