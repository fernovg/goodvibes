import { Component, Input } from '@angular/core';
import { producto } from 'src/app/models/tienda.models';

@Component({
  selector: 'app-gale-prod-da',
  templateUrl: './gale-prod-da.component.html',
  styleUrls: ['./gale-prod-da.component.scss']
})
export class GaleProdDaComponent {
  @Input() producto!: producto;

  images: string[] = [];

  selectedImage: string = '';

  ngOnInit(): void {
    // Agregar las fotos al arreglo de imágenes
    if (this.producto) {
      if (this.producto.foto1) {
        this.images.push(this.producto.foto1);
      }
      if (this.producto.foto2) {
        this.images.push(this.producto.foto2);
      }
      if (this.producto.foto3) {
        this.images.push(this.producto.foto3);
      }
      if (this.images.length === 0) {
        this.images.push('../../../assets/sinfoto.jpg');
      }
    }
    // Establecer la imagen seleccionada como la primera del arreglo
    if (this.images.length > 0) {
      this.selectedImage = this.images[0];
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }
}
