import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { ProgressComponent } from './progress/progress.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Grafica1Component,
    NotPageFoundComponent,
    ProgressComponent
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [
    PagesComponent,
    DashboardComponent,
    Grafica1Component,
    NotPageFoundComponent,
    ProgressComponent,
  ],
})
export class PagesModule {}
