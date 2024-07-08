import { Component, inject } from '@angular/core';
import { categorias } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddcategoriasComponent } from './addcategorias.component';
import { EditcategoriaComponent } from './editcategoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {

  categoria: categorias[] = [];

  request = {
    Id: ''
  }

  private dialog = inject(MatDialog);
  private tiendaService = inject(TiendaService);

  ngOnInit(): void {
    this.categorias();
  }


  categorias() {
    this.tiendaService.getCategoria().subscribe(categorias => {
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
      data: { id: cat.id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.categorias();
    });
  }

  borrar(cat: any) {
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + cat.Nombre + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.request.Id=cat.id;
        this.tiendaService.borrarCategoria(this.request).subscribe({
          next:(registro)=>{
            if(!registro.result){
              Swal.fire(registro.message, "", "warning");
            }
            Swal.fire({
              position: "top-end",
              title: registro.message,
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                this.categorias();
              }
            });      
          }
        })
      }
    });
  }

}
