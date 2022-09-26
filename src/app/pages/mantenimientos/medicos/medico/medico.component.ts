import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico';

import { HospitalService } from 'src/app/services/hospitales/hospital.service';
import { MedicoService } from 'src/app/services/medicos/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
})
export class MedicoComponent implements OnInit {
  miFormulario!: FormGroup;
  hospitalesDisponibles!: Hospital[];
  hospitalSeleccionado!: Hospital;
  medico!: Medico;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.cargarMedico(id);
      },
    });

    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();
    this.miFormulario.get('hospital')?.valueChanges.pipe(delay(100)).subscribe({
      next: (hospitalId) => {
        this.hospitalSeleccionado = this.hospitalesDisponibles.find(
          (hospital) => hospital._id === hospitalId
        )!;
      },
    });
  }

  cargarMedico(id: string) {
    this.medicoService.getMedicoId(id).subscribe({
      next: (response) => {
        const {
          nombre,
          hospital: { _id },
        } = response;
        this.medico = response;
        this.miFormulario.setValue({
          nombre,
          hospital: _id,
        });
      },
      error: (err) => console.log(err),
    });
  }

  cargarHospitales() {
    this.hospitalService.getHospitales().subscribe({
      next: (response) => {
        this.hospitalesDisponibles = response.hospitales;
      },
    });
  }

  private buildForm() {
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', Validators.required],
    });
  }

  guardarMedico() {
    const {nombre}  = this.miFormulario.value
    if (this.medico) {
      this.medicoService.actualizarHospital(this.miFormulario.value,this.medico._id!).subscribe({
        next: (response) =>{
           Swal.fire(
             'Creado',
             `${nombre} creado correctamente`,
             'success'
           );
        }
      })
    } else {
      this.medicoService.crearHospital(this.miFormulario.value).subscribe({
        next: (response) => {
          if (response.ok) {
            Swal.fire('Creado',`${nombre} actualizado correctamente`,'success')
            this.router.navigateByUrl(`/dashboard/medicos/${response.medico._id}`)
          }
        },
        error: (err) => console.log(err),
      });
    }
  }
}
