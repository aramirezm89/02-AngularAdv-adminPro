import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
/*   menu: Menu[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: 'main' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Graficas', url: 'grafica1' },
        { titulo: 'Account Settings', url: 'account-settings' },
      ],
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Médicos', url: 'medicos' },
      ],
    },
    {
      titulo: 'Promesas',
      icono: 'mdi mdi-label',
      submenu: [
        { titulo: 'Promesa', url: 'promesa' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ],
    },
  ]; */

  menu:Menu[] = []
  constructor() {}


cargarMenu(){
  this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
}

}

export interface Menu{
  titulo:string,
  icono:string,
  submenu:Submenu[]
}

export interface Submenu{
titulo:string,
url:string
}
