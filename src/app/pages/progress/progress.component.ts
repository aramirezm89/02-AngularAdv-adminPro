import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  progresoBar1: number = 10;
  progresoBar2: number = 20;

  get getProgreso1() {
    if (this.progresoBar1 === null) {
      this.progresoBar1 = 0;
    }

    return `${this.progresoBar1}%`;
  }

  get getProgreso2() {
    if (this.progresoBar2 === null) {
      this.progresoBar2 = 0;
    }

    return `${this.progresoBar2}%`;
  }

  constructor() {}

  ngOnInit(): void {}


}
