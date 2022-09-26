import { Hospital } from "./hospital.model";


export class Medico {
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: MedicoUser,
    public hospital? : Hospital
  ) {}


}

export interface MedicoUser {
  _id: string;
  nombre: string;
  email:string;
  img: string;
}


