import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { ModalImagenService } from 'src/app/components/services/modal-imagen.service';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { HospitalService } from 'src/app/services/hospitales/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  cargando: boolean = true;
  desde: number = 0;
  hospitales!: Hospital[];
  hosítalesTemp!: Hospital[];
  nombre: string = '';
  txtBusqueda: string = '';
  totalRegistro: number = 0;
  imagenSuscription!: Subscription;
  constructor(
    private hospitalService: HospitalService,
    public modalImageService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imagenSuscription.unsubscribe();
  }

  ngOnInit(): void {
    this.imagenSuscription = this.modalImageService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarHospitales();
      });
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.hospitalService.getHospitales(this.desde).subscribe((response) => {
      this.hospitales = response.hospitales;
      this.hosítalesTemp = response.hospitales;
      this.totalRegistro = response.totalRegistros;
      this.cargando = false;
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalRegistro) {
      this.desde -= valor;
    }

    this.cargarHospitales();
  }

  buscarHospital() {
    if (this.txtBusqueda.length === 0) {
      this.hospitales = this.hosítalesTemp;
      return;
    }
    this.busquedaService
      .buscarPorColeccion('hospitales', this.txtBusqueda)
      .subscribe({
        next: (response) => {
          this.hospitales = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  cambiarNombre(hospital: Hospital) {
    if (hospital.nombre.length === 0) {
      Swal.fire('Error', 'El nombre no puede estar vacio', 'error');
    }

    this.hospitalService.actualizarHospital(hospital).subscribe({
      next: (response) => {
        if (response.ok) {
          this.cargarHospitales();
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      },
    });
  }

  eliminarHospital(hospital: Hospital) {
    const { _id } = hospital;

    if (!_id) {
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
        this.hospitalService.eliminarHospital(_id).subscribe({
          next: (response) => {
            if (response.ok) {
              Swal.fire('Borrado', response.message, 'success');
              this.cargarHospitales();
            }
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Error', 'El registro no pudo ser eliminado', 'error');
          },
        });
      }
    });
  }
  abrirModal(hospital: Hospital) {
    this.modalImageService.abrirModal(
      'hospitales',
      hospital._id!,
      hospital.img
    );
  }

  async crearHospital() {
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Nombre Hospital',
      inputPlaceholder: 'Ingresa nombre del hospital',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    });

    if (value) {
      this.hospitalService.crearHospital(value).subscribe({
        next: (response) => {
          Swal.fire('Creado', 'Hospital creado correctamente', 'success');
          this.cargarHospitales();
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo crear el hospital', 'error');
        },
      });
    }
  }
}
