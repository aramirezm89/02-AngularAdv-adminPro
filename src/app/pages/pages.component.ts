import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  el: HTMLAnchorElement = document.querySelector('#theme')!;

  constructor() {}

  ngOnInit(): void {
    this.mainTheme()
  }

  mainTheme() {
    const defaultTheme = `./assets/css/colors/default-dark.css`;
    const theme = localStorage.getItem('theme');
    if(theme){
      this.el.href = theme;
    }else{
      this.el.href = defaultTheme;
    }
  }
}
