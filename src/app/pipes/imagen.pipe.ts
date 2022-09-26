import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img:string,tipo:'usuarios'|'hospitales'|'medicos'): string {
    const url = `${baseUrl}/upload/${tipo}/${img}`

    if(!img){
      return `${baseUrl}/upload/usuarios/no-image`;
    }else if(img.includes('https')){
      return img
    }else if(img){
      return `${baseUrl}/upload/${tipo}/${img}`
    }else{
       return `${baseUrl}/upload/usuarios/no-image`;
    }

  }

}
