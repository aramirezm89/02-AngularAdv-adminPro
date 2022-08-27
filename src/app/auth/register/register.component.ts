import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formSubmited = false;
  miFormulario = this.fb.group(
    {
      nombre: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.pattern(this.validatorService.emailPattern),
          Validators.required,
        ],
      ],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      terminos: [false, [Validators.requiredTrue]],
    },
    { validators: [this.validatorService.equalPasswords('password','password2')] }
  );

  constructor(
    public fb: FormBuilder,
    public validatorService: ValidatorsService
  ) {}

  crearUsuario() {
    this.formSubmited = true;
    console.log(this.miFormulario);

    if (this.miFormulario.valid) {
      console.log(this.miFormulario.get('password2'))
      console.log('Posteando formulario');
    }
  }

  campoValido(campo: string): boolean {
    const control = this.miFormulario.get(campo)!;
    if (control.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }
}
