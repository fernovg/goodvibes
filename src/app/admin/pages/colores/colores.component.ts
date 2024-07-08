import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { colores } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';
import { AddcolorComponent } from './addcolor.component';
import { EditcolorComponent } from './editcolor.component';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.scss']
})
export class ColoresComponent {

  color: colores[] = [];

  request = {
    Id: ''
  }

  private dialog = inject(MatDialog);
  private tiendaService = inject(TiendaService);

  ngOnInit(): void {
    this.colores();
  }


  colores() {
    this.tiendaService.getColores().subscribe(colores => {
      this.color = colores;
    });
  }

  opendialog() {
    const dialogRef = this.dialog.open(AddcolorComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.colores();
    });
  }

  openDialogEdit(tema: any) {
    const dialogRef = this.dialog.open(EditcolorComponent, {
      data: { id: tema.id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.colores();
    });
  }


  borrar(color: any) {
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + color.color + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.request.Id = color.id;
        this.tiendaService.borrarColor(this.request).subscribe({
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
                this.colores();
              }
            });
          }
        })
      }
    });
  }
}
