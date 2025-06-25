import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcolor',
  templateUrl: './addcolor.component.html',
  styleUrls: ['./addcolor.component.scss']
})
export class AddcolorComponent {
  private fireService = inject(FirestoreService);

  request = {
    uid: this.fireService.crearIdDoc(),
    color: "",
  }

  private dialogRef = inject(MatDialogRef<AddcolorComponent>);

  guardar() {
    const path = 'color'
    if (this.request.color == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return
    }
    this.fireService.crearDocumento(this.request, path, this.request.uid);
    this.mostrarMensajeVal('Registro de Color Correcto');
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
