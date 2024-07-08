import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { colecciones } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';
import { AddcoleccionComponent } from './addcoleccion.component';
import { EditcoleccionComponent } from './editcoleccion.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.scss']
})
export class ColeccionesComponent {

  coleccion: colecciones[] = [];

  request = {
    Id: ''
  }

  private dialog = inject(MatDialog);
  private tiendaService = inject(TiendaService);

  ngOnInit(): void {
    this.colecciones();
  }

  colecciones() {
    this.tiendaService.getColecciones().subscribe(colecciones => {
      this.coleccion = colecciones;
    });
  }

  opendialog() {
    const dialogRef = this.dialog.open(AddcoleccionComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.colecciones();
    });
  }

  openDialogEdit(cat: any) {
    const dialogRef = this.dialog.open(EditcoleccionComponent, {
      data: { id: cat.id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.colecciones();
    });
  }

  borrar(col: any) {
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + col.Nombre + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.request.Id = col.id;
        this.tiendaService.borrarColeccion(this.request).subscribe({
          next: (registro) => {
            if (!registro.result) {
              Swal.fire(registro.message, "", "warning");
            }
            Swal.fire({
              position: "top-end",
              title: registro.message,
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                this.colecciones();
              }
            });
          }
        })
      }
    });
  }

}
