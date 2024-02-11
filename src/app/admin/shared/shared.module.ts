import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from '../admin-routing.module';
import { TarDashComponent } from './tar-dash/tar-dash.component';
import { TarDProdComponent } from './tar-d-prod/tar-d-prod.component';
import { GaleProdDaComponent } from './gale-prod-da/gale-prod-da.component';



@NgModule({
  declarations: [
    SidebarComponent,
    TarDashComponent,
    TarDProdComponent,
    GaleProdDaComponent
  ],
  exports:[
    SidebarComponent,
    TarDashComponent,
    TarDProdComponent,
    GaleProdDaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class SharedModule { }
