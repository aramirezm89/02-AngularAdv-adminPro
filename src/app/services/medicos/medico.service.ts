import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CrearMedicoResponse } from 'src/app/interfaces/crearMedicoResponse';
import { GetMedicoIDResponse } from 'src/app/interfaces/getMedicoIdResponse';
import { GetMedicosResponse } from 'src/app/interfaces/getMedicosResponse';
import { Medico } from 'src/app/models/medico';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class MedicoService {
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
  constructor(private http: HttpClient) {}

  getMedicos(desde?:number) {
    const url = `${baseUrl}/medicos?desde=${desde}`;

    return this.http.get<GetMedicosResponse>(url).pipe(
      map((response) => {
       const {medicos,totalRegistro}= response;
        return {
          medicos,
          totalRegistro
        }



      })
    );
  }

  getMedicoId(id: string) {
    const url = `${baseUrl}/medicos/${id}`;

    return this.http.get<GetMedicoIDResponse>(url).pipe(
      map((response) => {
        return response.medico;
      })
    );
  }
  crearHospital(medicoForm: { nombre: string; hospital: string }) {
    const url = `${baseUrl}/medicos`;

    return this.http.post<CrearMedicoResponse>(url, medicoForm, this.headers);
  }

  actualizarHospital(medicoForm: { nombre: string; hospital: string },id:string) {
    const url = `${baseUrl}/medicos/${id}`;

    return this.http.put(url, medicoForm, this.headers);
  }
}
