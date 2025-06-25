import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { colecciones } from 'src/app/models/tienda.models';
import { AddcoleccionComponent } from './addcoleccion.component';
import { EditcoleccionComponent } from './editcoleccion.component';
import Swal from 'sweetalert2';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.scss']
})
export class ColeccionesComponent {

  coleccion: colecciones[] = [];

  private dialog = inject(MatDialog);
  private fireService = inject(FirestoreService);

  ngOnInit(): void {
    this.colecciones();
  }

  colecciones() {
    const path = 'coleccion';
    this.fireService.traerColeccion<colecciones>(path).subscribe(colecciones => {
      this.coleccion = colecciones;
    })
  }

  opendialog() {
    const dialogRef = this.dialog.open(AddcoleccionComponent);
    dialogRef.afterClosed().subscribe(() => {
      // this.colecciones();
    });
  }

  openDialogEdit(cat: any) {
    const dialogRef = this.dialog.open(EditcoleccionComponent, {
      data: { uid: cat.uid }
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.colecciones();
    });
  }

  borrar(col: any) {
    const path = 'coleccion';
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + col.Nombre + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.fireService.borrarDocID(path, col.uid);
        this.mostrarMensajeVal('Elimando correctamente')
      }
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
