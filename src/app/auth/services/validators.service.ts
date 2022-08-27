import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public emailPattern : string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor() {}


  equalPasswords(campo1:string , campo2:string) {
    return (formGroup:AbstractControl) : ValidationErrors | null =>{
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if(pass1 !== pass2){
        /*como cmapos iguales es una validacion a nivel global del formulario con la siguiente
        linea se le setea al error al campo que se desea muestre el nombre
        en este caso el campos password2*/

        formGroup.get(campo2)?.setErrors({noIguales:true});
        return {
          noIguales:true
        };
      }

      formGroup.get(campo2)?.setErrors(null);

      return null;
    }
  }
}
