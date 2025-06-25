import { Component, inject } from '@angular/core';
import { categorias } from 'src/app/models/tienda.models';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddcategoriasComponent } from './addcategorias.component';
import { EditcategoriaComponent } from './editcategoria.component';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {

  private fireService = inject(FirestoreService);
  categoria: categorias[] = [];

  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.categorias();
  }


  categorias() {
    const path = 'categoria';
    this.fireService.traerColeccion<categorias>(path).subscribe(categorias => {
      this.categoria = categorias;
    });
  }

  opendialog(){
    const dialogRef = this.dialog.open(AddcategoriasComponent);
    dialogRef.afterClosed().subscribe( () => {
      this.categorias();
    });
  }

  openDialogEdit(cat: any) {
    const dialogRef = this.dialog.open(EditcategoriaComponent, {
      data: { uid: cat.uid }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.categorias();
    });
  }

  borrar(cat: any) {
    const path = 'categoria';
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + cat.Nombre + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.fireService.borrarDocID(path, cat.uid);
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
