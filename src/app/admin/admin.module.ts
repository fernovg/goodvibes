import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { SharedModule } from './shared/shared.module';
import { NgmaterialModule } from '../ngmaterial/ngmaterial.module';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroprodComponent } from './pages/registroprod/registroprod.component';
import { EditarProdComponent } from './pages/editar-prod/editar-prod.component';
import { VerProdComponent } from './pages/ver-prod/ver-prod.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { NuevapubliComponent } from './pages/galeria/nuevapubli.component';
import { VerpubliComponent } from './pages/galeria/verpubli.component';
import { EditarpubliComponent } from './pages/galeria/editarpubli.component';



@NgModule({
  declarations: [
    ProductosComponent,
    InicioComponent,
    RegistroprodComponent,
    EditarProdComponent,
    VerProdComponent,
    GaleriaComponent,
    NuevapubliComponent,
    VerpubliComponent,
    EditarpubliComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    NgmaterialModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
