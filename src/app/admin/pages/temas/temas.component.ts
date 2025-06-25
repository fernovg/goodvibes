import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { temas } from 'src/app/models/tienda.models';
import { AddtemasComponent } from './addtemas.component';
import { EdittemasComponent } from './edittemas.component';
import Swal from 'sweetalert2';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent {

  private fireService = inject(FirestoreService);
  private dialog = inject(MatDialog);
  tema: temas[] = [];

  ngOnInit(): void {
    this.temas();
  }

  temas() {
    const path = 'tema'
    this.fireService.traerColeccion<temas>(path).subscribe(temas => {
      this.tema = temas;
    });
  }

  opendialog() {
    const dialogRef = this.dialog.open(AddtemasComponent);
    dialogRef.afterClosed().subscribe(() => {
      // this.temas();
    });
  }

  openDialogEdit(tema: any) {
    const dialogRef = this.dialog.open(EdittemasComponent, {
      data: { uid: tema.uid }
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.temas();
    });
  }

  borrar(tema: any) {
    const path = 'tema'
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + tema.tema + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.fireService.borrarDocID(path, tema.uid);
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