import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { LoginForm } from 'src/app/interfaces/loginForm';
import { LoginResponse } from 'src/app/interfaces/loginResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.base_url;
  constructor(private http: HttpClient) {}


  loginUsuario(formData:LoginForm) : Observable<LoginResponse> {

   const url = `${this.baseUrl}/auth/login`;

   return this.http.post<LoginResponse>(url,formData).pipe(
    tap(response => {
        localStorage.setItem('token',response.token);
    })
   );
  }
}
