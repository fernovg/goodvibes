import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcoleccion',
  templateUrl: './addcoleccion.component.html',
  styleUrls: ['./addcoleccion.component.scss']
})
export class AddcoleccionComponent {

  private dialogRef = inject(MatDialogRef<AddcoleccionComponent>);
  private fireService = inject(FirestoreService);

  request = {
    uid: this.fireService.crearIdDoc(),
    coleccion: "",
    status: true
  }
  
  guardar() {
    const path = 'coleccion'
    if (this.request.coleccion == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return
    }
    this.fireService.crearDocumento(this.request, path, this.request.uid);
    this.mostrarMensajeVal('Registro de Coleccion Correcto');
    this.dialogRef.close();
    // this.tiendaService.regiColeccion(this.request).subscribe({
    //   next: (registro) => {
    //     if (!registro.result) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "error",
    //         title: registro.message,
    //         showConfirmButton: false,
    //         timer: 1500
    //       });
    //       return
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
    // console.log("salir modal");
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