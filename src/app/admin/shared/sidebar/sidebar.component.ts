import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  nombre: string | undefined;
  usuario: string | undefined;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
    this.nombre = this.auth.currentUserValue.nombre;
    this.usuario = this.auth.currentUserValue.tipo;
    // console.log(this.nombre)
    // console.log(this.usuario)
    // console.log(this.auth.currentUserValue)
  }

  cerrar() {
    this.auth.logout();
    this.router.navigate(['/inicio'])
    window.location.reload();
    localStorage.removeItem('swalShown');
  }
  

}
