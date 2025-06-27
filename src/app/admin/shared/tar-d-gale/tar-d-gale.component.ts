import { Component, inject } from '@angular/core';
import { limit, orderBy } from '@angular/fire/firestore';
import { Blog, galeria } from 'src/app/models/galeria.models';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tar-d-gale',
  templateUrl: './tar-d-gale.component.html',
  styleUrls: ['./tar-d-gale.component.scss']
})
export class TarDGaleComponent {

  private fireService = inject(FirestoreService);
  blog: Blog[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getProd();
  }

  getProd() {
    const path = 'blog'
    this.fireService.traerColeccionW<Blog>(path, [orderBy('fecha', 'desc')]).subscribe(blog => {
      this.blog = blog;
    })
  }

  borrar(publicacion: any) {
    const path = 'blog'
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + publicacion.titulo + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.fireService.borrarDocID(path, publicacion.uid)
          .then(() => {
            this.mostrarMensajeVal('Publicacion Borrada');
            // this.router.navigate(['/dashboard/galerias']);
          })
          .catch((err) => {
            console.error('Error al borrar:', err);
            this.mostrarMensajeError('No Se Pudo Borrar La Publicacion')
          });
      }
    });
  }

  //*Alertas
  mostrarMensajeError(mensaje: string) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }

  mostrarMensajeVal(mensaje: string) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
