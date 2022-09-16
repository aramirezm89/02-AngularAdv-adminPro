import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/upload/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  miFormulario!: FormGroup;
  usuario: Usuario;
  imagenSubir?: File;
  imagenTemporal: string | ArrayBuffer | null = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuariosService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = authService.usuario;
    console.log(this.usuario);
    const { nombre, email } = this.usuario;
    this.miFormulario = this.fb.group({
      nombre: [nombre, [Validators.required]],
      email: [email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.miFormulario.value).subscribe({
      next: (response) => {
        const { nombre, email } = this.miFormulario.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire({
          title: 'Guardado',
          text: 'Usuario actualzado',
          confirmButtonColor: '#06d79c',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          confirmButtonColor: '#3085d6',
          icon: 'error',
        });
      },
    });
  }

  //este metodo es utilizado para obtener y mostrar la vista previa de la imagen que quiera subir
  cambiarImagen(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    this.imagenSubir = file;

    //fileReader lo utilizo para generar una imagen de vista previa
    if (!file) {
      this.imagenTemporal = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemporal = reader.result;
    };
  }

  actualizarImagen() {
    this.fileUploadService
      .actualizarFotoHTPPCLIENT(
        this.imagenSubir!,
        'usuarios',
        this.usuario.uid!
      )
      .subscribe({
        next: (response) => {
          const { nombreArchivo } = response;
          this.usuario.img = `${nombreArchivo}`;
          Swal.fire({
            title: 'Guardado',
            text: 'Imagen actualzada',
            confirmButtonColor: '#06d79c',
            icon: 'success',
          });
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
}
