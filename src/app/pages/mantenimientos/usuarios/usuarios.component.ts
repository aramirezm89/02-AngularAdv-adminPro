import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { ModalImagenService } from 'src/app/components/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

import Swal from 'sweetalert2';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit,OnDestroy {
  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;

  txtBusqueda: string = '';

  imgSubscription! : Subscription;

  constructor(
    private usuarioService: UsuariosService,
    private busquedasService: BusquedasService,
    private authService: AuthService,
    private modalImagenService: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }

  ngOnInit(): void {
   this.imgSubscription = this.modalImagenService.nuevaImagen
      .pipe(
      delay(100)
      )
      .subscribe((img) =>{
        this.cargarUsuarios()
      });
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe({
      next: ({ totalRegistros, usuarios }) => {
        this.totalUsuarios = totalRegistros;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      },
      error: (err) => console.log(err),
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar() {
    if (this.txtBusqueda.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedasService
      .buscarPorColeccion('usuarios', this.txtBusqueda)
      .subscribe({
        next: (res) => {
          this.usuarios = res;
        },
        error: (error) =>{
          console.log(error)
        }
      });
  }

  borrarUsuario(uid: string) {
    if (this.authService.usuario.uid === uid) {
      Swal.fire({
        title: 'Error',
        text: 'No puedes elminarte a ti mismo',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
      });

      return;
    }

    Swal.fire({
      title: '¿Realmente desea borrar este usuario?',
      text: 'La operacion es irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (uid.length > 0) {
          this.usuarioService.borrarUsuarios(uid).subscribe({
            next: (response) => {
              if (response.ok) {
                Swal.fire('Borrado!', response.message, 'success');
                this.cargarUsuarios();
              }
            },
            error: (error) => {
              Swal.fire('Borrado!', error.message, 'error');
            },
          });
        }
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe({
      next: (res) => {
        if (usuario.uid === this.authService.usuario.uid) {
          this.authService.usuario.role = res.usuario.role;
        }
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el rol', 'error');
      },
    });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}
