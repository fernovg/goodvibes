import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categorias, colecciones, colores, producto, temas } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-prod',
  templateUrl: './editar-prod.component.html',
  styleUrls: ['./editar-prod.component.scss']
})
export class EditarProdComponent {

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
    Cate: "",
    Col: "",
    Tema: "",
    Color: "",
    Foto1: "",
    Foto2: "",
    Foto3: "",
  }

  constructor(
    private tiendaService: TiendaService,
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
    this.tiendaService.getCategoria().subscribe(categorias => {
      this.categoria = categorias;
    })
  }

  colecciones() {
    this.tiendaService.getColecciones().subscribe(colecciones => {
      this.coleccion = colecciones;
    });
  }

  temas() {
    this.tiendaService.getTemas().subscribe(temas => {
      this.tema = temas;
    });
  }

  colores() {
    this.tiendaService.getColores().subscribe(colores => {
      this.color = colores;
    });
  }

  verProducto(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['Id'];
      this.tiendaService.getProducto({ Id: id }).subscribe(
        producto => {
          this.producto = producto;
          this.request.Id = producto.id;
          this.request.Nombre = producto.Nombre;
          this.request.Descripcion = producto.descripcion;
          this.request.Precio = producto.precio.toString();
          this.request.Cate = producto.idcategoria;
          this.request.Col = producto.idcoleccion;
          this.request.Tema = producto.idtema;
          this.request.Color = producto.idcolor;
          this.request.Stock = producto.stock.toString();
          this.request.Foto1 = producto.foto1;
          this.request.Foto2 = producto.foto2;
          this.request.Foto3 = producto.foto3;
        }
      );
    });
  }

  guardar() {
    // this.producto!.id = this.request.Id
    if (this.base) {  // Verifica si this.base está lleno
      this.request.Foto1 = this.base;
    }
    if (this.base2) {  // Verifica si this.base está lleno
      this.request.Foto2 = this.base2;
    }
    if (this.base3) {  // Verifica si this.base está lleno
      this.request.Foto3 = this.base3;
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
    this.tiendaService.editarProd(this.request).subscribe({
      next: (editarP) => {
        if (!editarP.result) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: editarP.message,
            showConfirmButton: false,
            timer: 1500
          });
          return
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: editarP.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/dashboard/productos'])
      }
    })
    console.log(this.request);
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
