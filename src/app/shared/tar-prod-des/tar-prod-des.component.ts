import { Component, inject } from '@angular/core';
import { prodTienda } from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';
import { orderBy, limit } from '@angular/fire/firestore';

@Component({
  selector: 'app-tar-prod-des',
  templateUrl: './tar-prod-des.component.html',
  styleUrls: ['./tar-prod-des.component.scss']
})
export class TarProdDesComponent {

  prodTienda: prodTienda[] = [];

  private fireService = inject(FirestoreService);

  constructor() { }

  ngOnInit(): void {
    this.getProd();
  }

  getProd() {
    const path = 'productos';

    this.fireService.traerColeccionW<prodTienda>(path, [
      orderBy('timestamp', 'desc'),
      limit(4)
    ]).subscribe(prodTienda => {
      this.prodTienda = prodTienda;
    });
  }

}
