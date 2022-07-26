import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';



@NgModule({
  declarations: [IncrementadorComponent, GraficoDonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[IncrementadorComponent,GraficoDonaComponent]
})
export class ComponentsModule { }
