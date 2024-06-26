import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from '../admin-routing.module';
import { TarDashComponent } from './tar-dash/tar-dash.component';
import { TarDProdComponent } from './tar-d-prod/tar-d-prod.component';
import { GaleProdDaComponent } from './gale-prod-da/gale-prod-da.component';
import { TarDGaleComponent } from './tar-d-gale/tar-d-gale.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidebarComponent,
    TarDashComponent,
    TarDProdComponent,
    GaleProdDaComponent,
    TarDGaleComponent
  ],
  exports:[
    SidebarComponent,
    TarDashComponent,
    TarDProdComponent,
    GaleProdDaComponent,
    TarDGaleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class SharedModule { }
