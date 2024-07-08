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
import { ColeccionesComponent } from './pages/colecciones/colecciones.component';
import { TemasComponent } from './pages/temas/temas.component';
import { ColoresComponent } from './pages/colores/colores.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { AddcategoriasComponent } from './pages/categorias/addcategorias.component';
import { EditcategoriaComponent } from './pages/categorias/editcategoria.component';
import { EditcoleccionComponent } from './pages/colecciones/editcoleccion.component';
import { AddcoleccionComponent } from './pages/colecciones/addcoleccion.component';
import { AddtemasComponent } from './pages/temas/addtemas.component';
import { EdittemasComponent } from './pages/temas/edittemas.component';
import { EditcolorComponent } from './pages/colores/editcolor.component';
import { AddcolorComponent } from './pages/colores/addcolor.component';



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
    EditarpubliComponent,
    ColeccionesComponent,
    TemasComponent,
    ColoresComponent,
    CategoriasComponent,
    AddcategoriasComponent,
    EditcategoriaComponent,
    EditcoleccionComponent,
    AddcoleccionComponent,
    AddtemasComponent,
    EdittemasComponent,
    EditcolorComponent,
    AddcolorComponent
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
