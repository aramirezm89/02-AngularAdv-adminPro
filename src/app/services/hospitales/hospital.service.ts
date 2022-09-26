import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ActualizarHospitalResponse } from 'src/app/interfaces/actualizarHospitalResponse';
import { CrearHospitalResponse } from 'src/app/interfaces/crearHospitalResponse';
import { EliminarHospitalResponse } from 'src/app/interfaces/eliminarHospitalResponse';
import { GetHospitalesResponse } from 'src/app/interfaces/getHospitalesResponse';
import { Hospital } from 'src/app/models/hospital.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
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

  /* dos formar de obtener el listado de hospitales
       la segunda getHospitalesMap crea una instancia de clase Hospital por cada elemento
       obtenido en la respuesta
  */
  getHospitales(desde: number = 0) {
    const url = `${baseUrl}/hospitales?desde=${desde}`;

    return this.http.get<GetHospitalesResponse>(url).pipe(
      map((response) => {
        return {
          hospitales: response.hospitales,
          totalRegistros: response.totalRegistros,
        };
      })
    );
  }

  getHospitalesMap(desde: number = 0) {
    const url = `${baseUrl}/hospitales?desde=${desde}`;

    return this.http.get<GetHospitalesResponse>(url).pipe(
      map((response) => {
        const hospital = response.hospitales.map(
          (hospital) =>
            new Hospital(
              hospital.nombre,
              hospital._id,
              hospital.img,
              hospital.usuario
            )
        );

        return {
          hospital,
          totalRegistros: response.totalRegistros,
        };
      })
    );
  }

  crearHospital(nombre: string) {
    const url = `${baseUrl}/hospitales`;

    return this.http.post<CrearHospitalResponse>(
      url,
      {nombre},
      this.headers
    );
  }

  actualizarHospital(hospital: Hospital) {
    const url = `${baseUrl}/hospitales/${hospital._id}`;

    return this.http.put<ActualizarHospitalResponse>(
      url,
      hospital,
      this.headers
    );
  }

  eliminarHospital(id: string) {
    const url = `${baseUrl}/hospitales/${id}`;

    return this.http.delete<EliminarHospitalResponse>(url, this.headers);
  }
}
