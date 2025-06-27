import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categorias, colecciones, colores, producto, temas } from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-ver-prod',
  templateUrl: './ver-prod.component.html',
  styleUrls: ['./ver-prod.component.scss']
})
export class VerProdComponent {
  private fireService = inject(FirestoreService);
  producto! : producto | undefined;
  categoria: categorias | undefined;
  coleccion: colecciones | undefined;
  tema: temas | undefined;
  color: colores | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
  ){}

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

}
