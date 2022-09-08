import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems:any;
  usuario : Usuario;


  constructor(private sidebarService:SidebarService,private authService : AuthService) {
   this.usuario = this.authService.usuario;
   }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
  }

}
