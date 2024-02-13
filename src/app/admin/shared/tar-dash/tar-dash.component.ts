import { Component } from '@angular/core';
import { totalPub } from 'src/app/models/galeria.models';
import { prodTienda, totalpCat } from 'src/app/models/tienda.models';
import { GaleriaService } from 'src/app/services/galeria.service';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tar-dash',
  templateUrl: './tar-dash.component.html',
  styleUrls: ['./tar-dash.component.scss']
})
export class TarDashComponent {

  prodTienda: prodTienda[] = [];
  totalpCat: totalpCat[] = [];
  totalPub! : totalPub | undefined;

  constructor(
    private tiendaService: TiendaService,
    private galeriaService: GaleriaService
  ){}

  ngOnInit(): void {
    this.getProd();
    this.getPrpCat();
    this.getTPub();
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

  getTPub(){
    this.galeriaService.getTotal().subscribe( totalPub => {
      this.totalPub = totalPub;
    })
  }
  
}