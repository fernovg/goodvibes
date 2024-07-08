import { Component, OnInit } from '@angular/core';
import { categorias, colecciones, colores, prodTienda, temas } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tar-prod',
  templateUrl: './tar-prod.component.html',
  styleUrls: ['./tar-prod.component.scss']
})
export class TarProdComponent implements OnInit {

  prodTienda: prodTienda[] = [];
  filteredProducts: prodTienda[] = [];
  displayedProducts: prodTienda[] = [];

  // datos
  categoria: categorias[] = [];
  coleccion: colecciones[] = [];
  tema: temas[] = [];
  color: colores[] = [];

  // filtros seleccionados
  selectedCategoria: Set<string> = new Set();
  selectedColeccion: Set<string> = new Set();
  selectedTema: Set<string> = new Set();
  selectedColor: Set<string> = new Set();

  // ordenar por
  order: string = '';

  constructor(private tiendaService: TiendaService) { }

  ngOnInit(): void {
    this.getProd();
    this.categorias();
    this.colecciones();
    this.temas();
    this.colores();
  }

  getProd() {
    this.tiendaService.getProd().subscribe(prodTienda => {
      this.prodTienda = prodTienda;
      this.filteredProducts = prodTienda; // Inicialmente muestra todos los productos
      this.filterProducts(); // Filtrar productos después de la carga inicial
    });
  }

  categorias() {
    this.tiendaService.getCategoria().subscribe(categorias => {
      this.categoria = categorias;
    });
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

  // Métodos para manejar los filtros
  toggleFilter(type: string, value: string) {
    const selectedSet = this.getSelectedSet(type);
    if (selectedSet.has(value)) {
      selectedSet.delete(value);
    } else {
      selectedSet.add(value);
    }
    this.filterProducts();
  }

  getSelectedSet(type: string): Set<string> {
    switch (type) {
      case 'categoria': return this.selectedCategoria;
      case 'coleccion': return this.selectedColeccion;
      case 'tema': return this.selectedTema;
      case 'color': return this.selectedColor;
      default: return new Set<string>();
    }
  }

  clearAllFilters() {
    this.selectedCategoria.clear();
    this.selectedColeccion.clear();
    this.selectedTema.clear();
    this.selectedColor.clear();
    this.order = '';
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.prodTienda.filter(product => {
      return (this.selectedCategoria.size === 0 || this.selectedCategoria.has(product.categoria)) &&
        (this.selectedColeccion.size === 0 || this.selectedColeccion.has(product.coleccion)) &&
        (this.selectedTema.size === 0 || this.selectedTema.has(product.tema)) &&
        (this.selectedColor.size === 0 || this.selectedColor.has(product.color));
    });

    if (this.order === 'precioAsc') {
      this.filteredProducts.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
    } else if (this.order === 'precioDesc') {
      this.filteredProducts.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
    }
  }

  setOrder(order: string) {
    if(this.order === order){
      this.order = '';
    }else{
      this.order = order;
    }
    this.filterProducts();
  }

  get anyFilterSelected(): boolean {
    return this.selectedCategoria.size > 0 ||
      this.selectedColeccion.size > 0 ||
      this.selectedTema.size > 0 ||
      this.selectedColor.size > 0;
  }
}
