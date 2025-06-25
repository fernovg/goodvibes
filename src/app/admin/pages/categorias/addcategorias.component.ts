import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcategorias',
  templateUrl: './addcategorias.component.html',
  styleUrls: ['./addcategorias.component.scss']
})
export class AddcategoriasComponent {

  private fireService = inject(FirestoreService);
  private dialogRef = inject(MatDialogRef<AddcategoriasComponent>);

  request = {
    uid: this.fireService.crearIdDoc(),
    Nombre: ""
  }

  guardar() {
    const path = 'categoria'
    if (this.request.Nombre == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return
    }
    this.fireService.crearDocumento(this.request, path, this.request.uid);
    this.mostrarMensajeVal('Registro de Categoria Correcto');
    this.dialogRef.close();
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
