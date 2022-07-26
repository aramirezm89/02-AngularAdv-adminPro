import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css'],
})
export class GraficoDonaComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() data: number[] = [340, 400, 100];
  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = ['Label1', 'Label2', 'Label3'];
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
          hoverBackgroundColor: ['#6857E6', '#009FEE', '#F02059'],
        },
      ],
    };
  }
}
