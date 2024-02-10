import { Component } from '@angular/core';
import { prodTienda } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tar-prod-des',
  templateUrl: './tar-prod-des.component.html',
  styleUrls: ['./tar-prod-des.component.scss']
})
export class TarProdDesComponent {

  prodTienda: prodTienda[] = [];

  constructor(
    private tiendaService: TiendaService,
  ){}

  ngOnInit(): void {
    this.getProd();
  }

  getProd(){
    this.tiendaService.getProdDes().subscribe( prodTienda => {
      this.prodTienda = prodTienda;
    })
  }

}
