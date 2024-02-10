import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from '../admin-routing.module';
import { TarDashComponent } from './tar-dash/tar-dash.component';
import { TarDProdComponent } from './tar-d-prod/tar-d-prod.component';



@NgModule({
  declarations: [
    SidebarComponent,
    TarDashComponent,
    TarDProdComponent
  ],
  exports:[
    SidebarComponent,
    TarDashComponent,
    TarDProdComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class SharedModule { }
