import { Component, inject } from '@angular/core';
import { prodTienda } from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tar-prod-des',
  templateUrl: './tar-prod-des.component.html',
  styleUrls: ['./tar-prod-des.component.scss']
})
export class TarProdDesComponent {

  prodTienda: prodTienda[] = [];

  private fireService = inject(FirestoreService);

  constructor(
    private tiendaService: TiendaService,
  ){}

  ngOnInit(): void {
    this.getProd();
  }

  getProd(){
    const path = `productos`;

    this.fireService.traerColeccion<prodTienda>(path).subscribe( prodTienda => {
      this.prodTienda = prodTienda;
      console.log(prodTienda);
    })
  }

}
