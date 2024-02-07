import { Component } from '@angular/core';

@Component({
  selector: 'app-gale-prod',
  templateUrl: './gale-prod.component.html',
  styleUrls: ['./gale-prod.component.scss']
})
export class GaleProdComponent {

  images: string[] = [
    '../../../assets/prod-prueba.jpg',
    '../../../assets/prod-prueba2.jpg',
    '../../../assets/prod-prueba3.jpg',
    '../../../assets/prod-prueba4.jpg',
    '../../../assets/prod-prueba5.jpg',
  ];
  selectedImage: string = this.images[0];

  selectImage(image: string) {
    this.selectedImage = image;
  }

}
