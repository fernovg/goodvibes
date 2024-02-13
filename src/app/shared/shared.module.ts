import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TarProdComponent } from './tar-prod/tar-prod.component';
import { FooterComponent } from './footer/footer.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes/heroes.component';
import { GaleProdComponent } from './gale-prod/gale-prod.component';
import { TarProdDesComponent } from './tar-prod-des/tar-prod-des.component';
import { TarGaleComponent } from './tar-gale/tar-gale.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TarProdComponent,
    FooterComponent,
    ComentariosComponent,
    HeroesComponent,
    GaleProdComponent,
    TarProdDesComponent,
    TarGaleComponent
  ],
  exports:[
    NavbarComponent,
    TarProdComponent,
    FooterComponent,
    ComentariosComponent,
    HeroesComponent,
    GaleProdComponent,
    TarProdDesComponent,
    TarGaleComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
