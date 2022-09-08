

import { environment } from "src/environments/environment"
const basse_url = environment.base_url;

export class Usuario{
  constructor(
    public nombre:string,
    public email:string,
    public password?:string,
    public img?:string,
    public role?:string,
    public google?:boolean,
    public uid?:string,

  ){}

  get imgenUrl(){


    if(this.img){

      if (this.img.includes('https')) {
        return this.img;
      }else{
         return `${basse_url}/upload/usuarios/${this.img}`;
      }

    }else{
        return `${basse_url}/upload/usuarios/no-image.jpg`;
    }
  }

  set imagenSetter(value:string){
    this.img = value
  }
}
