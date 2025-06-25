import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtemas',
  templateUrl: './addtemas.component.html',
  styleUrls: ['./addtemas.component.scss']
})
export class AddtemasComponent {

  private dialogRef = inject(MatDialogRef<AddtemasComponent>);
  private fireService = inject(FirestoreService);

  request = {
    uid: this.fireService.crearIdDoc(),
    tema: ""
  }
  
  guardar() {
    const path = 'tema';
    if (this.request.tema == "") {
      this.mostrarMensajeError("Falta El Nombre Del Tema");
      return
    }
    this.fireService.crearDocumento(this.request, path, this.request.uid);
    this.mostrarMensajeVal('Registro de Coleccion Correcto');
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
