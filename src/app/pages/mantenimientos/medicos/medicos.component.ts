import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { ModalImagenService } from 'src/app/components/services/modal-imagen.service';
import { Medico } from 'src/app/models/medico';
import { MedicoService } from 'src/app/services/medicos/medico.service';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  txtBusqueda: string = '';
  medicos: Medico[] = [];
  cargando: boolean = true;
  totalRegistro: number = 0;
  imagenSuscription! : Subscription;
  constructor(
    public modalService: ModalImagenService,
    private medicoService: MedicoService
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
    this.medicoService.getMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
        this.cargando = false;
      },
      error: (err) => console.log(err),
    });
  }

  buscarHospital() {}

  abrirModal(medico: Medico) {
    this.modalService.abrirModal('medicos', medico._id!, medico.img);
  }

  eliminarMedico(medico: Medico) {}
}
