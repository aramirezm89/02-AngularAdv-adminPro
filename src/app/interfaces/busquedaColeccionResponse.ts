// Generated by https://quicktype.io

import { Hospital } from "../models/hospital.model";

export interface BusquedaPorColeccionResponse {
  ok:             boolean;
  resultados:     Resultado[];
  totalRegistros: number;
  registros:      number;
  coleccion:      string;
}

export interface Resultado {
  _id:    string;
  nombre: string;
  email:  string;
  img?:   string;
  role:   string;
  google: boolean;
  imgenUrl:string;
  imagenSetter:string;
}
