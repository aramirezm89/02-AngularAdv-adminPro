import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubirImagenResponse } from 'src/app/interfaces/subirImagenResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseUrl = environment.base_url;
  get token() {
    return localStorage.getItem('token') || '';
  }

  constructor(private http: HttpClient) {}

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${this.baseUrl}/upload/${tipo}/${id}`;
      const formData: FormData = new FormData();
      formData.append('img', archivo);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.token,
        },
        body: formData,
      });

      console.log(response);

      return archivo.name;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  actualizarFotoHTPPCLIENT(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  )
  {
      const url = `${this.baseUrl}/upload/${tipo}/${id}`;
      const formData: FormData = new FormData();
      formData.append('img', archivo);

    return this.http.put<SubirImagenResponse>(url,formData,{
        headers:{
          'x-token':this.token
        }
      })

  }
}
