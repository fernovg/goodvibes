import { Component } from '@angular/core';
import { editarP, prodTienda } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tar-d-prod',
  templateUrl: './tar-d-prod.component.html',
  styleUrls: ['./tar-d-prod.component.scss']
})
export class TarDProdComponent {

  prodTienda: prodTienda[] = [];

  productoSeleccionado: any;

  constructor(
    private tiendaService: TiendaService,
  ){}

  ngOnInit(): void {
    this.getProd();
  }

  getProd(){
    this.tiendaService.getProd().subscribe( prodTienda => {
      this.prodTienda = prodTienda;
    })
  }

  request = {
    Id: ""
  }

  borrar(producto: any) {
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + producto.Nombre + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.request.Id=producto.id;
        this.tiendaService.borrarProd(this.request).subscribe({
          next:(borrarP)=>{
            if(!borrarP.result){
              Swal.fire(borrarP.message, "", "warning");
            }
            Swal.fire({
              position: "top-end",
              title: borrarP.message,
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });      
          }
        })
      }
    });
  }


  //* Editar el stock del producto
  requestStock = {
    Id: "",
    Stock: ""
  }

  setProductoSeleccionado(producto: any): void {
    this.productoSeleccionado = { ...producto }; // Crea una copia para evitar mutaciones directas
    this.requestStock.Id = this.productoSeleccionado?.id;
  }

  guardarStock(){
    this.tiendaService.editarStock(this.requestStock).subscribe({
      next:(editStock)=>{
        if(!editStock.result) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: editStock.message,
            showConfirmButton: false,
            timer: 1500
          });
          return
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: editStock.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.getProd();
      }
    })    
  }

}
