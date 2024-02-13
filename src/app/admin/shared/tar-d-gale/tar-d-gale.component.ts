import { Component } from '@angular/core';
import { galeria } from 'src/app/models/galeria.models';
import { GaleriaService } from 'src/app/services/galeria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tar-d-gale',
  templateUrl: './tar-d-gale.component.html',
  styleUrls: ['./tar-d-gale.component.scss']
})
export class TarDGaleComponent {

  galeria: galeria[] = [];

  constructor(
    private galeriaService: GaleriaService,
  ){}

  ngOnInit(): void {
    this.getProd();
  }

  getProd(){
    this.galeriaService.getGaleria().subscribe( galeria => {
      this.galeria = galeria;
    })
  }

  request = {
    Id: ""
  }

  borrar(publicacion: any) {
    Swal.fire({
      position: "top-end",
      title: "Estas seguro que quieres borrar " + publicacion.id + "?",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.request.Id=publicacion.id;
        this.galeriaService.borrar(this.request).subscribe({
          next:(resPubli)=>{
            if(!resPubli.result){
              Swal.fire(resPubli.message, "", "warning");
            }
            Swal.fire({
              position: "top-end",
              title: resPubli.message,
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

}
