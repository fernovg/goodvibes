import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { producto } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  producto! : producto | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tiendaService: TiendaService
  ){}

  ngOnInit(): void {
    this.verProducto();
  }

  verProducto(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['Id'];
      this.tiendaService.getProducto({ Id: id }).subscribe(
        producto => {
          this.producto = producto;
        }
      );
    });
  }

  irAWatsapp(): void {
    const telefono = '7711750196'; // Número de teléfono de destino
    const mensaje = `Hola! Quisiera saber más información sobre ${this.producto?.Nombre || ''}`; // Mensaje con información del producto
    const enlace = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, '_blank');
}


}