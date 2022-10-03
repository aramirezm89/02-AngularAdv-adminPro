import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BusquedaPorColeccionResponse } from 'src/app/interfaces/busquedaColeccionResponse';
import { BusquedaTodo } from 'src/app/interfaces/busquedaTodoResponse';
import { Tipos } from 'src/app/interfaces/tipos';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  transformarUsuarios(resultados: any[]): Usuario[] {
    const usuarios = resultados.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.role,
          user.google,
          user._id
        )
    );

    return usuarios;
  }

  constructor(private http: HttpClient) {}

  buscarPorColeccion(
    coleccion: 'usuarios' | 'medicos' | 'hospitales',
    query: string
  ) {
    const url = `${base_url}/todo/coleccion/${coleccion}/${query}`;

    return this.http.get<any>(url, this.headers).pipe(
      map((response) => {
        switch (coleccion) {
          case 'usuarios':
           return this.transformarUsuarios(response.resultados);
           break;
           case 'hospitales':
            return response.resultados;
           break
           case 'medicos':
            return response.resultados;
          default:
           return []

        }
      })
    );
  }


  busquedaTotal(termino:string){

    const url = `${base_url}/todo/${termino}`;

   return   this.http.get<BusquedaTodo>(url,this.headers).pipe(
    map(({usuarios,medicos,hospitales}) =>{
      return {
        usuarios,medicos,hospitales
      }
    })
   );
  }
}
