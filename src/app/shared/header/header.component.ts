import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario : Usuario;
  constructor(private authService:AuthService,private router :Router) {
   this.usuario = this.authService.usuario;
   }

  ngOnInit(): void {
  }


  buscar(valor:string){
    if(!valor){
      return
    }

    this.router.navigateByUrl(`dashboard/buscar/${valor}`);

  }
  logout() {
    this.authService.logout();
  }
}
