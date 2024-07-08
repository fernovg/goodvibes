import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edittemas',
  templateUrl: './edittemas.component.html',
  styleUrls: ['./addtemas.component.scss']
})
export class EdittemasComponent {

  private dialogRef = inject(MatDialogRef<EdittemasComponent>);
  private tiendaService = inject(TiendaService);
  
  request = {
    Nombre: "",
    Id: this.data.id 
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  guardar() {
    if (this.request.Nombre == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return;
    }
    // Aquí se debería llamar al servicio de tienda para actualizar la categoría
    this.tiendaService.editarTema(this.request).subscribe({
      next: (registro) => {
        if (!registro.result) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: registro.message,
            showConfirmButton: false,
            timer: 1500
          });
          return;
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
