import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { ModalImagenService } from 'src/app/components/services/modal-imagen.service';
import { Medico } from 'src/app/models/medico';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { MedicoService } from 'src/app/services/medicos/medico.service';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  txtBusqueda: string = '';
  medicos: Medico[] = [];
  medicosTem:Medico[] =[];
  cargando: boolean = true;
  totalRegistro: number = 0;
  desde: number = 0;
  imagenSuscription! : Subscription;
  constructor(
    public modalService: ModalImagenService,
    private medicoService: MedicoService,
    private busquedaService : BusquedasService
  ) {}
  ngOnDestroy(): void {
   this.imagenSuscription.unsubscribe();
  }

  ngOnInit(): void {
   this.imagenSuscription = this.modalService.nuevaImagen.pipe(
      delay(100)
      ).subscribe((response) => {
      this.cargarMedicos();
    });

    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.getMedicos(this.desde).subscribe({
      next: (response) => {
        this.medicos = response.medicos;
        this.medicosTem = this.medicos;
        this.cargando = false;
        this.totalRegistro = response.totalRegistro;
      },
      error: (err) => console.log(err),
    });
  }

  buscarHospital() {
    if(this.txtBusqueda.length === 0){
      this.medicos = this.medicosTem;
      return
    }

    this.busquedaService.buscarPorColeccion('medicos',this.txtBusqueda).subscribe({
      next: (response) =>{
        this.medicos = response
      },
      error: (err) => console.log(err)
    })

  }

  cambiarPagina(valor : number){
    this.desde +=valor;

    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde >=this.totalRegistro){
      this.desde -= valor
    }

    this.cargarMedicos();
  }

  abrirModal(medico: Medico) {
    this.modalService.abrirModal('medicos', medico._id!, medico.img);
  }

  eliminarMedico(medico: Medico) {}
}
