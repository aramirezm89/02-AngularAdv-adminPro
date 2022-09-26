import { Component, OnInit,AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { ValidatorsService } from '../services/validators.service';
import { delay } from 'rxjs';


declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn! : ElementRef;
  formSubmited = false;
  miFormulario = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [
        Validators.pattern(this.validatorService.emailPattern),
        Validators.required,
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorService: ValidatorsService,
    private toastr: ToastrService,
    private ngZone:NgZone
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  ngOnInit(): void {
    const rememberEmail = localStorage.getItem('email');
    if (rememberEmail) {
      this.miFormulario.get('remember')?.setValue(true);
    } else {
      this.miFormulario.get('remember')?.setValue(false);
    }
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '1019404074505-cqopt5kitl8qt8pp4qnf07fmcji8gcpk.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response:any){

    this.authService.loginGoogle(response.credential).subscribe({
      next: (response) => {
        if (response.ok) {
          if (this.miFormulario.get('remember')?.value) {
            localStorage.setItem(
              'email',
              response.email
            );
          } else {
            localStorage.removeItem('email');
          }
          this.toastr.success(response.nombre, 'Bienvenido');


          this.router.navigateByUrl('/dashboard');


        }
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

  login() {
    this.formSubmited = true;

    if (this.miFormulario.invalid) {
      return;
    }

    this.authService.loginUsuario(this.miFormulario.value).subscribe({
      next: (response) => {
        if (response.ok) {
          if (this.miFormulario.get('remember')?.value) {
            localStorage.setItem(
              'email',
              this.miFormulario.get('email')?.value
            );
          } else {
            localStorage.removeItem('email');
          }
          this.toastr.success(response.nombre, 'Bienvenido');
          this.router.navigateByUrl('/dashboard');
        }
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
