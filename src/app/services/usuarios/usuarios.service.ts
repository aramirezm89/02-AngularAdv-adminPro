import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActualizarUsuarioResponse } from 'src/app/interfaces/actualizarUsuarioResponse';
import { CrearUsuarioResponse } from 'src/app/interfaces/crearUsuarioResponse';
import { EditarUSuarioForm } from 'src/app/interfaces/editarUsuarioForm';
import { RegisterForm } from 'src/app/interfaces/registerForm';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = environment.base_url;

  get token(){
    return localStorage.getItem('token') || '';
  }

  constructor(private http : HttpClient, private authSerive:AuthService) { }


  crearUsuario(formData:RegisterForm):Observable<CrearUsuarioResponse>{
    const url = `${this.baseUrl}/usuarios/crear`;
    return this.http.post<CrearUsuarioResponse>(url, formData).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  actualizarUsuario(usuario:EditarUSuarioForm){
    usuario = {
      ...usuario,
      role:this.authSerive.usuario.role
    }
    const url = `${this.baseUrl}/usuarios/${this.authSerive.usuario.uid}`
    return this.http.put<ActualizarUsuarioResponse>(url,usuario,{
      headers:{
        'x-token':this.token
      }
    })
  }
}
