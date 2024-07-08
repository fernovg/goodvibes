import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { temas } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';
import { AddtemasComponent } from './addtemas.component';
import { EdittemasComponent } from './edittemas.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent {

  tema: temas[] = [];

  request = {
    Id: ''
  }

  private dialog = inject(MatDialog);
  private tiendaService = inject(TiendaService);

  ngOnInit(): void {
    this.temas();
  }

  temas() {
    this.tiendaService.getTemas().subscribe(temas => {
      this.tema = temas;
    });
  }

  opendialog() {
    const dialogRef = this.dialog.open(AddtemasComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.temas();
    });
  }

  openDialogEdit(tema: any) {
    const dialogRef = this.dialog.open(EdittemasComponent, {
      data: { id: tema.id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.temas();
    });
  }


  borrar(tema: any) {
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + tema.Nombre + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.request.Id = tema.id;
        this.tiendaService.borrarTema(this.request).subscribe({
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
                this.temas();
              }
            });
          }
        })
      }
    });
  }

}