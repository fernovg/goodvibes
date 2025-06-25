import { Component, inject } from '@angular/core';
import { editarP, prodTienda } from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tar-d-prod',
  templateUrl: './tar-d-prod.component.html',
  styleUrls: ['./tar-d-prod.component.scss']
})
export class TarDProdComponent {

  prodTienda: prodTienda[] = [];
  private fireService = inject(FirestoreService);
  productoSeleccionado: any;

  constructor() { }

  ngOnInit(): void {
    this.getProd();
  }

  getProd() {
    const path = 'productos'
    this.fireService.traerColeccion<prodTienda>(path).subscribe(prodTienda => {
      this.prodTienda = prodTienda;
    })
  }

  borrar(producto: any) {
    const path = 'productos'
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + producto.Nombre + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.fireService.borrarDocID(path, producto.uid);
        this.mostrarMensajeVal('Elimando correctamente')
      }
    });
  }


  //* Editar el stock del producto
  requestStock = {
    Id: '',
    stock: ""
  }

  setProductoSeleccionado(producto: any): void {
    this.productoSeleccionado = { ...producto }; // Crea una copia para evitar mutaciones directas
    this.requestStock.Id = this.productoSeleccionado?.uid;
  }

  guardarStock() {
    const path = 'productos';
    const data = {
      stock: this.requestStock.stock
    };
    console.log(this.requestStock)
    this.fireService.actualizarDocId(data, path, this.requestStock.Id)
    .then(() => this.mostrarMensajeVal('Stock Actualizado'))
    .catch(err => this.mostrarMensajeError('Error al actualizar stock'));
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
