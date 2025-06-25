import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edittemas',
  templateUrl: './edittemas.component.html',
  styleUrls: ['./addtemas.component.scss']
})
export class EdittemasComponent {

  private dialogRef = inject(MatDialogRef<EdittemasComponent>);
  private fireService = inject(FirestoreService);
  request = {
    tema: "",
    uid: this.data.uid 
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  guardar() {
    const path = 'tema';
    if (this.request.tema == "") {
      this.mostrarMensajeError("Falta El Nombre Del Tema");
      return;
    }
    const { tema } = this.request;
    this.fireService.actualizarDocId({ tema }, path, this.data.uid)
    .then(() => {
      this.mostrarMensajeVal('Tema Editado Correctamente');
      this.dialogRef.close();
    })
    .catch((error) => {
      console.error('Error al editar tema:', error);
      this.mostrarMensajeError('Error al editar el tema');
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
