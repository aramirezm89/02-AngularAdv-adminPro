import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    /*  const promesa = new Promise((resolve,reject) => {
      if(false){
        resolve('Hola mundo');
      }else{
        reject('Algo salio mal')
      }
    }).then((mensaje ) =>{
      console.log(mensaje)
      console.log('Hey termine')

    }).catch(err => console.log(err));


    console.log('Fin init') */
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });
  }

  getUsuarios() {
    const url = `https://reqres.in/api/users?page=2`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}
