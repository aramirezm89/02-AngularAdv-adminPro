import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


 const childrenRoutes: Routes = [
   //el atributo data esta siendo ocupado en el componente breadCurmbs ubicado en la carpeta shared
   { path: 'main', component: DashboardComponent, data: { titulo: 'Main' } },
   {
     path: 'account-settings',
     component: AccountSettingsComponent,
     data: { titulo: 'Ajuste de Cuenta' },
   },
   {
     path: 'buscar/:termino',
     component: BusquedaComponent,
     data: { titulo: 'Busquedas' },
   },
   {
     path: 'grafica1',
     component: Grafica1Component,
     data: { titulo: 'Graficas' },
   },
   {
     path: 'progress',
     component: ProgressComponent,
     data: { titulo: 'ProgressBar' },
   },
   {
     path: 'promesa',
     component: PromesasComponent,
     data: { titulo: 'Promesa' },
   },
   { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' } },
   {
     path: 'profile',
     component: PerfilComponent,
     data: { titulo: 'Perfil de usuario' },
   },

   //mantenimientos

   {
     path: 'usuarios',
     component: UsuariosComponent,
     canActivate: [AdminGuard],
     canLoad: [AdminGuard],
     data: { titulo: 'Mantenimiento de Usuario' },
   },
   {
     path: 'hospitales',
     component: HospitalesComponent,
     data: { titulo: 'Mantenimiento de Hospitales' },
   },
   {
     path: 'medicos',
     component: MedicosComponent,
     data: { titulo: 'Mantenimiento de Medicos' },
   },
   {
     path: 'medicos/:id',
     component: MedicoComponent,
     data: { titulo: 'Mantenimiento de Medicos' },
   },

   //ruta no encontrada
   { path: '**', redirectTo: 'main' },
 ];
@NgModule({
  imports: [RouterModule.forChild(childrenRoutes)],
  exports: [RouterModule],
})
export class ChildrenRoutesModule {}
