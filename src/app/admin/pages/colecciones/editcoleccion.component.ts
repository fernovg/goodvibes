import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcoleccion',
  templateUrl: './editcoleccion.component.html',
  styleUrls: ['./addcoleccion.component.scss']
})
export class EditcoleccionComponent {

  private dialogRef = inject(MatDialogRef<EditcoleccionComponent>);
  private fireService = inject(FirestoreService);
  request = {
    coleccion: "",
    uid: this.data.uid 
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  guardar() {
    const path = 'coleccion'
    if (this.request.coleccion == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return;
    }
    this.fireService.actualizarDocId(this.request, path, this.request.uid);
    this.mostrarMensajeVal('Coleccion Editado Correctamente')
    this.dialogRef.close();
    // Aquí se debería llamar al servicio de tienda para actualizar la categoría
    // this.tiendaService.editarColeccion(this.request).subscribe({
    //   next: (registro) => {
    //     if (!registro.result) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "error",
    //         title: registro.message,
    //         showConfirmButton: false,
    //         timer: 1500
    //       });
    //       return;
    //     }
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: registro.message,
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //     this.dialogRef.close();
    //   }
    // })
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
