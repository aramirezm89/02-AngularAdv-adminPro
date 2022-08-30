import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';
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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      password2: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      terminos: [false, [Validators.requiredTrue]],
    },
    {
      validators: [
        this.validatorService.equalPasswords('password', 'password2'),
      ],
    }
  );

  constructor(
    public fb: FormBuilder,
    public validatorService: ValidatorsService,
    public usuarioService: UsuariosService
  ) {}

  crearUsuario() {
    this.formSubmited = true;

    if (this.miFormulario.invalid) {
      return;
    }

    //realizar posteo del formulario

    this.usuarioService.crearUsuario(this.miFormulario.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          confirmButtonColor: '#3085d6',
          icon: 'error',
        });
      },
    });
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
