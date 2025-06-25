import { Component, inject } from '@angular/core';
import { totalPub } from 'src/app/models/galeria.models';
import { categorias, prodTienda, totalpCat } from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';
import { GaleriaService } from 'src/app/services/galeria.service';

@Component({
  selector: 'app-tar-dash',
  templateUrl: './tar-dash.component.html',
  styleUrls: ['./tar-dash.component.scss']
})
export class TarDashComponent {

  private fireService = inject(FirestoreService);

  prodTienda: prodTienda[] = [];
  categorias: categorias[] = [];
  // totalpCat: totalpCat[] = [];
  totalpCat: { categoria: string; total_productos: number }[] = [];
  totalPub! : totalPub | undefined;

  constructor(
    private galeriaService: GaleriaService
  ){}

  ngOnInit(): void {
    this.getProd();
    // this.getCate();
    this.getTPub();
  }

  getProd(){
    const path = 'productos';
    this.fireService.traerColeccion<prodTienda>(path).subscribe( prodTienda => {
      this.prodTienda = prodTienda;
      this.getCate();
      this.calcularTotalesPorCategoria();
    })
  }

  getCate(){
    const path = 'categoria';
    this.fireService.traerColeccion<categorias>(path).subscribe( categorias => {
      this.categorias = categorias;
      if (this.categorias.length > 0) this.calcularTotalesPorCategoria();
    })
  }

  getTPub(){
    this.galeriaService.getTotal().subscribe( totalPub => {
      this.totalPub = totalPub;
    })
  }


  calcularTotalesPorCategoria() {
    const conteo: { [uidcategoria: string]: number } = {};
    for (const producto of this.prodTienda) {
      const uid = producto.uidcategoria || 'sin_categoria';
      conteo[uid] = (conteo[uid] || 0) + 1;
    }
    this.totalpCat = Object.entries(conteo).map(([uidcategoria, total_productos]) => {
      const nombreCategoria = this.categorias.find(cat => cat.uid === uidcategoria)?.Nombre || 'Sin categoría';
      return {
        categoria: nombreCategoria,
        total_productos
      };
    });
  }
  
}