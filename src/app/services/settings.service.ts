import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  linkTheme: HTMLAnchorElement = document.querySelector('#theme')!;//elemto ubicado en el index.html que contiene el tema de la app

  constructor() {}

  mainTheme() {
    const defaultTheme = `./assets/css/colors/default-dark.css`;
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.linkTheme.href = theme;
    } else {
      this.linkTheme.href = defaultTheme;
    }
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links  = document.querySelectorAll('.selector'); //Obtiene el conjunto de elemntos con la clase .selector
    const currentTheme = this.linkTheme.getAttribute('href'); //recupera el url del thema acutual
     links.forEach((el) => {
      el.classList.remove('working'); //remuevo la clase working (pone el check en la cuadricula de tema seleccionado)
      const btnTheme = el.getAttribute('data-theme'); //recupero el valor del atributo personalizado
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`; //contruyo el url de tema .
      //comparo si el url del tema actual es identico al url contruido, si hacen match se agrega clase working
      if (currentTheme === btnThemeUrl) {
        el.classList.add('working');
      }
    });
  }
}
