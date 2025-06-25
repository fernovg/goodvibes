import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categorias, colecciones, colores, producto, temas } from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-prod',
  templateUrl: './editar-prod.component.html',
  styleUrls: ['./editar-prod.component.scss']
})
export class EditarProdComponent {

  private fireService = inject(FirestoreService);
  categoria: categorias[] = [];
  coleccion: colecciones[] = [];
  tema: temas[] = [];
  color: colores[] = [];

  producto!: producto | undefined;

  request = {
    Id: "",
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Stock: "",
    uidcategoria: "",
    uidcoleccion: "",
    uidtema: "",
    uidcolor: "",
    foto1: "",
    foto2: "",
    foto3: "",
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verProducto();
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

  verProducto(): void {
    const path = 'productos';
    this.activatedRoute.params.subscribe(params => {
      const id = params['Id'];
      this.fireService.traerDocumentoPorId<producto>(path, id).then(
        producto => {
          if (!producto) {
            console.error('Producto no encontrado');
            return;
          }
          this.producto = producto;
          this.request.Id = producto.uid;
          this.request.Nombre = producto.Nombre;
          this.request.Descripcion = producto.descripcion;
          this.request.Precio = producto.precio.toString();
          this.request.uidcategoria = producto.uidcategoria;
          this.request.uidcoleccion = producto.uidcoleccion;
          this.request.uidtema = producto.uidtema;
          this.request.uidcolor = producto.uidcolor;
          this.request.Stock = producto.stock.toString();
          this.request.foto1 = producto.foto1;
          this.request.foto2 = producto.foto2;
          this.request.foto3 = producto.foto3;
        }
      );
    });
  }

  guardar() {
    const path = 'productos'
    // this.producto!.id = this.request.Id
    if (this.base) {  // Verifica si this.base está lleno
      this.request.foto1 = this.base;
    }
    if (this.base2) {  // Verifica si this.base está lleno
      this.request.foto2 = this.base2;
    }
    if (this.base3) {  // Verifica si this.base está lleno
      this.request.foto3 = this.base3;
    }
    if (this.request.Nombre == "") {
      this.mostrarMensajeError("Falta El Nombre");
      return
    }
    if (this.request.Descripcion == "") {
      this.mostrarMensajeError("Falta La Descripcion");
      return
    }
    if (this.request.Precio == "") {
      this.mostrarMensajeError("Falta El Precio");
      return
    }
    if (this.request.Stock == "") {
      this.mostrarMensajeError("Falta El Stock");
      return
    }
    const { Id, ...data  } = this.request;
    // ✅ Eliminar campos con undefined
    const dataToUpdate = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );
    this.fireService.actualizarDocId(dataToUpdate, path, Id)
    .then(() => {this.mostrarMensajeVal('Producto Actualizado'); this.router.navigate(['/dashboard/productos'])})
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
