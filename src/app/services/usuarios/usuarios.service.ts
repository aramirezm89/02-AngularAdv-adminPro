import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable,tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActualizarUsuarioResponse } from 'src/app/interfaces/actualizarUsuarioResponse';
import { BorrarEntidad } from 'src/app/interfaces/borrarEntidad';
import { CargarUsuariosResponse } from 'src/app/interfaces/CargarUsuariosResponse';
import { CrearUsuarioResponse } from 'src/app/interfaces/crearUsuarioResponse';
import { EditarUSuarioForm } from 'src/app/interfaces/editarUsuarioForm';
import { RegisterForm } from 'src/app/interfaces/registerForm';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = environment.base_url;

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
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
      role: this.authSerive.usuario.role!
    }

    const url = `${this.baseUrl}/usuarios/${this.authSerive.usuario.uid}`
    return this.http.put<ActualizarUsuarioResponse>(url,usuario,this.headers)
  }

  cargarUsuarios(desde : number = 0){
    const url = `${this.baseUrl}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuariosResponse>(url,this.headers)
    .pipe(
      map(res =>{
        const usuarios = res.usuarios.map(
          user => new Usuario(user.nombre,user.email,'',user.img,user.role,user.google,user._id))

          return {
            ok: true,
            usuarios,
            totalRegistros: res.totalRegistros,
          };
      })
    )
  }

  borrarUsuarios(id:string){
    const url = `${this.baseUrl}/usuarios/${id}`;

    return this.http.delete<BorrarEntidad>(url,this.headers)

  }

  //este metodo se creo para ser implentado es el usuarios.component.ts con el fin de cambiar role de usuario
  guardarUsuario(usuario:Usuario){
    const url = `${this.baseUrl}/usuarios/${usuario.uid}`;
    return this.http.put<ActualizarUsuarioResponse>(url, usuario, this.headers);
  }
}
