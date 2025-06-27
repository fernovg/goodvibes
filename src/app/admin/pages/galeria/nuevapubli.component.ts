import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firebase.service';
import { Blog } from 'src/app/models/galeria.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevapubli',
  templateUrl: './nuevapubli.component.html',
  styleUrls: ['./nuevapubli.component.scss']
})
export class NuevapubliComponent {

  private fireService = inject(FirestoreService);
  private authfire = inject(AuthService)

  nombre: string | undefined;
  foto: string | undefined;

  request = {
    Foto: "",
    Descripcion: "",
    Matricula: ""
  }

  constructor(
    private router: Router,
  ) { }

  async ngOnInit() {
    const userCredential = await this.authfire.getUserData()
    this.nombre = userCredential.Nombre;
    this.foto = userCredential.foto;
  }

  @ViewChild('filepicker', { static: false }) uploader!: ElementRef;

  base: string = "";

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

  onImageSelected(event: any, index: number) {
    const selected = event.target.files[0];
    const reader = new FileReader();

    if (selected.size < 2000000) {
      const ext = selected.type.split('/').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(ext)) {
        reader.readAsDataURL(selected);
        reader.onload = () => {
          const base64 = reader.result?.toString() || '';
          this.secciones[index].contenido = base64;
        };
      } else {
        this.mostrarMensajeError("Formato de imagen incorrecto");
      }
    } else {
      this.mostrarMensajeError("Imagen demasiado pesada");
    }
  }
  //! FIN FOTO

  titulo = '';
  secciones: { tipo: 'parrafo' | 'subtitulo' | 'imagen'; contenido: string }[] = [];
  etiquetasInput = '';

  agregarSeccion() {
    this.secciones.push({ tipo: 'parrafo', contenido: '' });
  }

  eliminarSeccion(index: number) {
    this.secciones.splice(index, 1);
  }

  guardar() {
    // Validaciones básicas
    if (!this.titulo.trim()) {
      this.mostrarMensajeError("Falta el título del blog");
      return;
    }

    if (this.secciones.length === 0) {
      this.mostrarMensajeError("Agrega al menos una sección");
      return;
    }

  const seccionesValidas = this.secciones
    .filter(sec => sec.contenido && sec.contenido.trim() !== '')
    .map(sec => ({
      tipo: sec.tipo,
      contenido: sec.contenido.trim()
    }));


    if (seccionesValidas.length === 0) {
      this.mostrarMensajeError("Todas las secciones están vacías");
      return;
    }
    const uid = this.fireService.crearIdDoc();
    const blog: Blog = {
      uid: uid,
      foto: this.foto || 'Anónimo',
      titulo: this.titulo,
      autor:  this.nombre || 'Anónimo',  // O usa uid si prefieres
      fecha: new Date().toISOString(),  // Formato ISO
      secciones: seccionesValidas,
      etiquetas: this.etiquetasInput
        .split(',')
        .map(et => et.trim())
        .filter(et => et !== '')
    };

    const path = 'blog';

    this.fireService.crearDocumento(blog, path, uid)
      .then(() => {
        this.mostrarMensajeVal('Publicacion Correcto');
        this.router.navigate(['/dashboard/galerias']);
      })
      .catch((err) => {
        console.error('Error al guardar el blog:', err);
        this.mostrarMensajeError('No se pudo guardar el blog')
      });
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
