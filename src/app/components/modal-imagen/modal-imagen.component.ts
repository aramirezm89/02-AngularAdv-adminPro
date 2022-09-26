import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/upload/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent implements OnInit {
  imagenTemporal: string | null | ArrayBuffer = '';
  imagenASubir!: File | null;
  constructor(public modalImagenService: ModalImagenService,public fileUploadService : FileUploadService) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imagenTemporal = null;
  }

  //este metodo es utilizado para obtener y mostrar la vista previa de la imagen que quiera subir
  cambiarImagen(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];

    if (!file) {
      this.imagenTemporal = null;
      this.imagenASubir = null;
    }

    this.imagenASubir = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemporal = reader.result;
    };
  }

  guardarImagen() {

       this.fileUploadService.actualizarFotoHTPPCLIENT(
         this.imagenASubir!,
         this.modalImagenService.tipo,
         this.modalImagenService.id
       ).subscribe({
        next : (res) =>{
          this.modalImagenService.nuevaImagen.emit(res.nombreArchivo)
          this.imagenTemporal = null
          this.modalImagenService.cerrarModal();
        },
        error:(error) =>{
          Swal.fire('Error',error.error.message,'error')
        }
       });

  }
}
