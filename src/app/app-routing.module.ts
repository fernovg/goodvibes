import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { LoginComponent } from './pages/login/login.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },{
    path: 'inicio',
    component: InicioComponent,
  },{
    path: 'catalogo',
    component: CatalogoComponent,
  },{
    path: 'catalogo/producto/:Id',
    component: ProductoComponent,
  },{
    path: 'nosotros',
    component: NosotrosComponent,
  },{
    path: 'galeria',
    component: GaleriaComponent,
  },{
    path: 'iniciosesion',
    component: LoginComponent,
  },{
    path: 'dashboard',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
