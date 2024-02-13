import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticacion.service';
import { GaleriaService } from 'src/app/services/galeria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevapubli',
  templateUrl: './nuevapubli.component.html',
  styleUrls: ['./nuevapubli.component.scss']
})
export class NuevapubliComponent {

  request = {
    Foto: "",
    Descripcion: "",
    Matricula: ""
  }

  constructor(
    private galeriaService: GaleriaService,
    private router: Router,
    private auth: AuthenticationService,
  ){}

  ngOnInit(): void {
    this.verificarConexion();
  }

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
        Descripcion: this.request.Descripcion,
        Foto: this.base
      };
  
      // Almacenar datos localmente
      localStorage.setItem('datosSinConexion', JSON.stringify(datosSinConexion));
  
      this.mostrarNotificacionPush('Datos guardados localmente', 'Los datos se guardarán cuando haya conexión a Internet.');
    }
  
    enviarDatosGuardados() {
      const datosSinConexionString = localStorage.getItem('datosSinConexion');
  
      if (datosSinConexionString) {
        const datosSinConexion = JSON.parse(datosSinConexionString);
  
        this.galeriaService.getPubli(datosSinConexion).subscribe({
          next: (resPubli) => {
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

    guardar(){
      if (!navigator.onLine) {
        // No hay conexión a Internet, guardar datos localmente
        this.guardarLocalmente();
        return;
      }
      
      this.request.Matricula = this.auth.currentUserValue.Matricula !== undefined ? this.auth.currentUserValue.Matricula.toString() : '';

      this.request.Foto=this.base;
      
      if (this.request.Descripcion == "") {
        this.mostrarMensajeError("Falta La Descripcion");
        return
      }
      this.galeriaService.getPubli(this.request).subscribe({
        next:(resPubli)=> {
          if (!resPubli.result) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: resPubli.message,
              showConfirmButton: false,
              timer: 1500
            });
            return
          } 
          this.mostrarNotificacionPush('Nueva publicacion', '¡Se ha publicado!');
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: resPubli.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/dashboard/galerias'])
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
