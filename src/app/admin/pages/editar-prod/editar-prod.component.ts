import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categorias, producto } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-prod',
  templateUrl: './editar-prod.component.html',
  styleUrls: ['./editar-prod.component.scss']
})
export class EditarProdComponent {

  categoria: categorias[] = [];
  
  producto! : producto | undefined;
  
  request = {
    Id: "",
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Stock: "",
    Cate: "",
    Foto1: "",
    Foto2: "",
    Foto3: "",
  }

  constructor(
    private tiendaService: TiendaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.verProducto();
    this.verificarConexion();
    this.categorias();
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

    //* Uso sin conexion
    verificarConexion() {
      if (navigator.onLine) {
        // Si hay conexión al cargar el componente, intentar enviar datos guardados
        this.enviarDatosGuardados();
      }
    }
  
    guardarLocalmente() {
      const datosSinConexion = {
        Nombre: this.request.Nombre,
        Descripcion: this.request.Descripcion,
        Precio: this.request.Precio,
        Stock: this.request.Stock,
        Foto1: this.base,
        Foto2: this.base2,
        Foto3: this.base3
      };
  
      // Almacenar datos localmente
      localStorage.setItem('datosSinConexion', JSON.stringify(datosSinConexion));
  
      this.mostrarNotificacionPush('Datos guardados localmente', 'Los datos se guardarán cuando haya conexión a Internet.');
    }
  
    enviarDatosGuardados() {
      const datosSinConexionString = localStorage.getItem('datosSinConexion');
  
      if (datosSinConexionString) {
        const datosSinConexion = JSON.parse(datosSinConexionString);
  
        this.tiendaService.regiProd(datosSinConexion).subscribe({
          next: (registroP) => {
            // Resto del código para manejar la respuesta
            // ...
            this.router.navigate(['/dashboard/productos']);
            this.mostrarNotificacionPush('Nuevo producto registrado', '¡Se ha registrado un nuevo producto!');
            // Eliminar datos guardados localmente después de enviarlos
            localStorage.removeItem('datosSinConexion');
          }
        });
      }
    }

    //* Fin de Uso sin conexion

    categorias(){
      this.tiendaService.getCategoria().subscribe( categorias => {
        this.categoria = categorias;
      })
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
            this.request.Cate = producto.categoria;
            this.request.Stock = producto.stock.toString();
            this.request.Foto1 = producto.foto1;
            this.request.Foto2 = producto.foto2;
            this.request.Foto3 = producto.foto3;
          }
        );
      });
    }

    guardar(){
      if (!navigator.onLine) {
        // No hay conexión a Internet, guardar datos localmente
        this.guardarLocalmente();
        return;
      }
      // this.producto!.id = this.request.Id
      this.request.Foto1=this.base;
      this.request.Foto2=this.base2;
      this.request.Foto3=this.base3;
      console.log(this.request);
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
        next:(editarP)=> {
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
          this.mostrarNotificacionPush('Producto editado', '¡Se ha editado el producto!');
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
  
    mostrarNotificacionPush(titulo: string, mensaje: string) {
      // Verificar si el navegador admite notificaciones
      if ('Notification' in window) {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
            // Crear y mostrar la notificación
            var notificacion = new Notification(titulo, {
              body: mensaje
            });
          }
        });
      }
    }


}
