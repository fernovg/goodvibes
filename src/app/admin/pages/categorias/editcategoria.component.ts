import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcategoria',
  templateUrl: './editcategoria.component.html',
  styleUrls: ['./addcategorias.component.scss']
})
export class EditcategoriaComponent {

  private dialogRef = inject(MatDialogRef<EditcategoriaComponent>);
  private fireService = inject(FirestoreService);
  
  request = {
    Nombre: "",
    uid: this.data.uid // Agregar la ID aquí
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  guardar() {
    if (this.request.Nombre == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return;
    }
    const path = 'categoria'
    this.fireService.actualizarDocId(this.request, path, this.request.uid);
    this.mostrarMensajeVal('Coleccion Editado Correctamente')
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
