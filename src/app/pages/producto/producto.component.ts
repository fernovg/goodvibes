import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  categorias,
  colecciones,
  colores,
  producto,
  temas,
} from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent {
  producto!: producto | undefined;
  private fireService = inject(FirestoreService);

  categoria: categorias | undefined;
  coleccion: colecciones | undefined;
  tema: temas | undefined;
  color: colores | undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.verProducto();
    
  }

  verProducto(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['uid']; // o params['id'] si así está definido en el routing
      const path = 'productos';
      this.fireService
        .traerDocumentoPorId<producto>(path, id)
        .then((producto) => {
          if (!producto) return;
          this.producto = producto;


          // ✅ Traer categoría
          if (producto.uidcategoria) {
            this.fireService
              .traerDocumentoPorId<categorias>('categoria', producto.uidcategoria)
              .then(categoria => this.categoria = categoria ?? undefined);
          }

          // ✅ Traer colección
          if (producto.uidcoleccion) {
            this.fireService
              .traerDocumentoPorId<colecciones>('coleccion', producto.uidcoleccion)
              .then(coleccion => this.coleccion = coleccion ?? undefined);
          }

          // ✅ Traer color
          if (producto.uidcolor) {
            this.fireService
              .traerDocumentoPorId<colores>('color', producto.uidcolor)
              .then(color => this.color = color ?? undefined);
          }

          // ✅ Traer tema
          if (producto.uidtema) {
            this.fireService
              .traerDocumentoPorId<temas>('tema', producto.uidtema)
              .then(tema => this.tema = tema ?? undefined);
          }
        });
    });
  }

  irAWatsapp(): void {
    const telefono = '7711750196'; // Número de teléfono de destino
    const mensaje = `Hola! Quisiera saber más información sobre ${
      this.producto?.Nombre || ''
    }`; // Mensaje con información del producto
    const enlace = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(enlace, '_blank');
  }

}
