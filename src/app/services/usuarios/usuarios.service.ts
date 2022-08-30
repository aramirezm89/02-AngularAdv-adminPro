import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { CrearUsuarioResponse } from 'src/app/interfaces/crearUsuarioResponse';
import { RegisterForm } from 'src/app/interfaces/registerForm';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = environment.base_url;

  constructor(private http : HttpClient) { }


  crearUsuario(formData:RegisterForm):Observable<CrearUsuarioResponse>{
    const url = `${this.baseUrl}/usuarios/crear`;
    return this.http.post<CrearUsuarioResponse>(url, formData).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }
}
