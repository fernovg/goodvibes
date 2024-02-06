import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  nombre: string | undefined;
  usuario: string | undefined;

  constructor(
    // private auth: AuthenticationService,
    // private router: Router
  ){}

  ngOnInit(){
    // this.nombre = this.auth.currentUserValue.nombre;
    // this.usuario = this.auth.currentUserValue.tipo;
    // console.log(this.nombre)
    // console.log(this.usuario)
    // console.log(this.auth.currentUserValue)
  }

  cerrar() {
    // this.auth.logout();
    // this.router.navigate(['/inicio'])
    window.location.reload();
    localStorage.removeItem('swalShown');
  }

}
