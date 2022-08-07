import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'main', component: DashboardComponent,data:{titulo:'Main'}},
      { path: 'account-settings', component: AccountSettingsComponent,data:{titulo:'Ajuste de Cuenta'} },
      { path: 'grafica1', component: Grafica1Component,data:{titulo:'Graficas'} },
      { path: 'progress', component: ProgressComponent, data:{titulo:'ProgressBar'}},
      { path: 'promesa', component: PromesasComponent ,data:{titulo:'Promesa'}},
      { path: 'rxjs', component: RxjsComponent ,data:{titulo:'RXJS'}},
      { path: '**', redirectTo: 'main' },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
