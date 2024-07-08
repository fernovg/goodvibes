import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtemas',
  templateUrl: './addtemas.component.html',
  styleUrls: ['./addtemas.component.scss']
})
export class AddtemasComponent {

  request = {
    Nombre: ""
  }

  private dialogRef = inject(MatDialogRef<AddtemasComponent>);
  private tiendaService = inject(TiendaService);

  guardar() {
    if (this.request.Nombre == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return
    }
    this.tiendaService.regiTema(this.request).subscribe({
      next: (registro) => {
        if (!registro.result) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: registro.message,
            showConfirmButton: false,
            timer: 1500
          });
          return
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: registro.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close();
      }
    })
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
