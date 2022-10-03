import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico';
import {Usuario} from 'src/app/interfaces/busquedaTodoResponse'
import {BusquedasService} from 'src/app/services/busquedas/busquedas.service'

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {


  usuarios:Usuario[] = [];
  hospitales:Hospital[] =[];
  medicos:Medico[] =[];

  constructor(private activatedRoute:ActivatedRoute,private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({termino}) =>{
        this.busquedaTotal(termino);
    })

  }

  busquedaTotal(termino : string){
      this.busquedaService.busquedaTotal(termino).subscribe({
        next: ({ usuarios, medicos, hospitales }) => {
          this.usuarios = usuarios;
          this.medicos = medicos;
          this.hospitales = hospitales;
        },
      });
  }

}
