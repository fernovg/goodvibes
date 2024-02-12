import { Component } from '@angular/core';
import { prodTienda, totalpCat } from 'src/app/models/tienda.models';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tar-dash',
  templateUrl: './tar-dash.component.html',
  styleUrls: ['./tar-dash.component.scss']
})
export class TarDashComponent {

  prodTienda: prodTienda[] = [];
  totalpCat: totalpCat[] = [];

  constructor(
    private tiendaService: TiendaService,
  ){}

  ngOnInit(): void {
    this.getProd();
    this.getPrpCat();
  }

  getProd(){
    this.tiendaService.getProd().subscribe( prodTienda => {
      this.prodTienda = prodTienda;
    })
  }

  getPrpCat(){
    this.tiendaService.getPrpCate().subscribe( totalpCat => {
      this.totalpCat = totalpCat;
    })
  }

  
}
