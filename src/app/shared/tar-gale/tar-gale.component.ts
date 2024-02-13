import { Component } from '@angular/core';
import { galeria } from 'src/app/models/galeria.models';
import { GaleriaService } from 'src/app/services/galeria.service';

@Component({
  selector: 'app-tar-gale',
  templateUrl: './tar-gale.component.html',
  styleUrls: ['./tar-gale.component.scss']
})
export class TarGaleComponent {

  galeria: galeria[] = [];

  constructor(
    private galeriaService: GaleriaService,
  ){}

  ngOnInit(): void {
    this.getProd();
  }

  getProd(){
    this.galeriaService.getGaleria().subscribe( galeria => {
      this.galeria = galeria;
    })
  }

}
