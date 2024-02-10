import { Component } from '@angular/core';
import { prodTienda } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tar-prod',
  templateUrl: './tar-prod.component.html',
  styleUrls: ['./tar-prod.component.scss']
})
export class TarProdComponent {

  prodTienda: prodTienda[] = [];

  constructor(
    private tiendaService: TiendaService,
  ){}

  ngOnInit(): void {
    this.getProd();
  }

  getProd(){
    this.tiendaService.getProd().subscribe( prodTienda => {
      this.prodTienda = prodTienda;
    })
  }

}
