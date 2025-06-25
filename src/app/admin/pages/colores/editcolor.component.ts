import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firebase.service';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcolor',
  templateUrl: './editcolor.component.html',
  styleUrls: ['./addcolor.component.scss']
})
export class EditcolorComponent {

  private dialogRef = inject(MatDialogRef<EditcolorComponent>);
  private fireService = inject(FirestoreService);
  request = {
    color: "",
    uid: this.data.uid 
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  guardar() {
    const path = 'color'
    if (this.request.color == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return;
    }
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