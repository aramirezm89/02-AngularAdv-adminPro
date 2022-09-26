import { environment } from "src/environments/environment"

const baseUrl = environment.base_url;

export class Hospital {
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: HospitalUsuario
  ) {}


  /* get imagenUrl() {
    if (this.img) {

      if(this.img.includes('https')){
        return this.img;
      }else{
        return `${baseUrl}/upload/hospitales/${this.img}`
      }

    }else{
      return `${baseUrl}/upload/hospitales/no-image`;
    }
  } */

}


 export interface HospitalUsuario{
 _id:string,
 nombre:string,
 email:string,
 img:string
}
