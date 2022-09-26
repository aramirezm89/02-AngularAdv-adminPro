import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    ImagenPipe,
    PagesComponent,
    ProgressComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    MedicoComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
  ],
})
export class PagesModule {}
