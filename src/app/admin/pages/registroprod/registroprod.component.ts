import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { categorias, colecciones, colores, temas } from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registroprod',
  templateUrl: './registroprod.component.html',
  styleUrls: ['./registroprod.component.scss']
})
export class RegistroprodComponent {

  private fireService = inject(FirestoreService);
  categoria: categorias[] = [];
  coleccion: colecciones[] = [];
  tema: temas[] = [];
  color: colores[] = [];

  request = {
    uid: this.fireService.crearIdDoc(),
    Nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    uidcategoria: "",
    uidcoleccion: "",
    uidtema: "",
    uidcolor: "",
    foto1: "",
    foto2: "",
    foto3: "",
    timestamp: new Date().toISOString()
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categorias();
    this.colecciones();
    this.temas();
    this.colores();
  }

  //! FOTO

  @ViewChild('filepicker', { static: false }) uploader!: ElementRef;

  base: string = "";
  base2: string = "";
  base3: string = "";

  addFile() {
    this.uploader.nativeElement.click();
  }

  async onFileSelected($event: any) {
    const selected = $event.target.files[0];
    var reader = new FileReader();

    if (selected.size < 2000000) {
      var ext = selected.type.split('/').pop();
      if (ext == "jpg" || ext == "jpeg" || ext == "png") {
        reader.readAsDataURL(selected);
        reader.onload = (_event) => {
          if (reader.result) {
            this.base = reader.result.toString();
            // Additional logic if needed
          } else {
            // Handle the case where reader.result is null
            this.mostrarMensajeError("Esta vacío");
          }
        };
      } else {
        // Handle incorrect image format
        this.mostrarMensajeError("Formato de imagen incorrecto");

      }
    } else {
      // Handle image size limit exceeded
      this.mostrarMensajeError("Pesa mucho");
    }
  }

  async onFileSelected2($event: any) {
    const selected = $event.target.files[0];
    var reader = new FileReader();

    if (selected.size < 2000000) {
      var ext = selected.type.split('/').pop();
      if (ext == "jpg" || ext == "jpeg" || ext == "png") {
        reader.readAsDataURL(selected);
        reader.onload = (_event) => {
          if (reader.result) {
            this.base2 = reader.result.toString();
            // Additional logic if needed
          } else {
            // Handle the case where reader.result is null
            this.mostrarMensajeError("Esta vacío");
          }
        };
      } else {
        // Handle incorrect image format
        this.mostrarMensajeError("Formato de imagen incorrecto");

      }
    } else {
      // Handle image size limit exceeded
      this.mostrarMensajeError("Pesa mucho");
    }
  }

  async onFileSelected3($event: any) {
    const selected = $event.target.files[0];
    var reader = new FileReader();

    if (selected.size < 2000000) {
      var ext = selected.type.split('/').pop();
      if (ext == "jpg" || ext == "jpeg" || ext == "png") {
        reader.readAsDataURL(selected);
        reader.onload = (_event) => {
          if (reader.result) {
            this.base3 = reader.result.toString();
            // Additional logic if needed
          } else {
            // Handle the case where reader.result is null
            this.mostrarMensajeError("Esta vacío");
          }
        };
      } else {
        // Handle incorrect image format
        this.mostrarMensajeError("Formato de imagen incorrecto");

      }
    } else {
      // Handle image size limit exceeded
      this.mostrarMensajeError("Pesa mucho");
    }
  }

  //! FIN FOTO

  //* Fin de Uso sin conexion

  categorias() {
    const path = 'categoria';
    this.fireService.traerColeccion<categorias>(path).subscribe(categorias => {
      this.categoria = categorias;
    })
  }

  colecciones() {
    const path = 'coleccion';
    this.fireService.traerColeccion<colecciones>(path).subscribe(colecciones => {
      this.coleccion = colecciones;
    });
  }

  temas() {
    const path = 'tema';
    this.fireService.traerColeccion<temas>(path).subscribe(temas => {
      this.tema = temas;
    });
  }

  colores() {
    const path = 'color';
    this.fireService.traerColeccion<colores>(path).subscribe(colores => {
      this.color = colores;
    });
  }

  guardar() {
    const path = 'productos';
    this.request.foto1 = this.base;
    this.request.foto2 = this.base2;
    this.request.foto3 = this.base3;
    console.log(this.request);
    if (this.request.Nombre == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return
    }
    if (this.request.descripcion == "") {
      this.mostrarMensajeError("Falta La Descripcion");
      return
    }
    if (this.request.precio == "") {
      this.mostrarMensajeError("Falta El Precio");
      return
    }
    if (this.request.stock == "") {
      this.mostrarMensajeError("Falta El Stock");
      return
    }
    this.fireService.crearDocumento(this.request, path, this.request.uid)
    .then(() => {this.mostrarMensajeVal('Producto Registrado'); this.router.navigate(['/dashboard/productos'])})
    .catch(error => this.mostrarMensajeError('Error Al Guardar Los Datos'))
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
