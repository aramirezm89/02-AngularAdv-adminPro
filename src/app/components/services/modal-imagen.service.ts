import { Injectable,EventEmitter} from '@angular/core';


const base_url = 'http://localhost:4000/api/upload'
@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal = true;

  tipo!: 'usuarios' | 'medicos' | 'hospitales' ;
  id: string = '';
  img?: string = '';
  //nuevaImagen es utilizada para poder refrescar la tabla de usuarios una vez realizada la petiicon para actualizar imagen
  //revisar codigo en modal-imagen.component
  nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() {}

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-image'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
