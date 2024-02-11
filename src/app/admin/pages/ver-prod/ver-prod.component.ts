import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { producto } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-ver-prod',
  templateUrl: './ver-prod.component.html',
  styleUrls: ['./ver-prod.component.scss']
})
export class VerProdComponent {

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

}
