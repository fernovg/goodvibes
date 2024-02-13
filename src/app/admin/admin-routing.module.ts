import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { ProductosComponent } from './pages/productos/productos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroprodComponent } from './pages/registroprod/registroprod.component';
import { EditarProdComponent } from './pages/editar-prod/editar-prod.component';
import { VerProdComponent } from './pages/ver-prod/ver-prod.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { NuevapubliComponent } from './pages/galeria/nuevapubli.component';

const routes: Routes = [
  {
    path:'',
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    children:[
      {
        path: 'inicio',
        canActivate: [ AuthGuard ],
        component: InicioComponent
      },{
        path: 'productos',
        canActivate: [ AuthGuard ],
        component: ProductosComponent
      },{
        path: 'registro_producto',
        canActivate: [ AuthGuard ],
        component: RegistroprodComponent
      },{
        path: 'editar_producto/:Id',
        canActivate: [ AuthGuard ],
        component: EditarProdComponent
      },{
        path: 'verproducto/:Id',
        canActivate: [ AuthGuard ],
        component: VerProdComponent
      },{
        path: 'galerias',
        canActivate: [ AuthGuard ],
        component: GaleriaComponent
      },{
        path: 'publicar',
        canActivate: [ AuthGuard ],
        component: NuevapubliComponent
      },{
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
