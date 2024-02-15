import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { publica } from 'src/app/models/galeria.models';
import { GaleriaService } from 'src/app/services/galeria.service';

@Component({
  selector: 'app-verpubli',
  templateUrl: './verpubli.component.html',
  styleUrls: ['./verpubli.component.scss']
})
export class VerpubliComponent {

  publica! : publica | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private galeriaService: GaleriaService
  ){}

  ngOnInit(): void {
    this.verPublicacion();
  }

  verPublicacion(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['Id'];
      this.galeriaService.getPublicacion({ Id: id }).subscribe(
        publica => {
          this.publica = publica;
        }
      );
    });
  }

}
