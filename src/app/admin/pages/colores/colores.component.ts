import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { colores } from 'src/app/models/tienda.models';
import Swal from 'sweetalert2';
import { AddcolorComponent } from './addcolor.component';
import { EditcolorComponent } from './editcolor.component';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.scss']
})
export class ColoresComponent {

  color: colores[] = [];

  private dialog = inject(MatDialog);
  private fireService = inject(FirestoreService);

  ngOnInit(): void {
    this.colores();
  }


  colores() {
    const path = 'color'
    this.fireService.traerColeccion<colores>(path).subscribe(colores => {
      this.color = colores;
    });
  }

  opendialog() {
    const dialogRef = this.dialog.open(AddcolorComponent);
    dialogRef.afterClosed().subscribe(() => {
      // this.colores();
    });
  }

  openDialogEdit(tema: any) {
    const dialogRef = this.dialog.open(EditcolorComponent, {
      data: { uid: tema.uid }
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.colores();
    });
  }


  borrar(col: any) {
    const path = 'color';
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + col.tema + "?",
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
