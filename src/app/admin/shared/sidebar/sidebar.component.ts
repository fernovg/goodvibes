import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private authfire = inject(AuthService)
  private router = inject(Router)

  nombre: string | undefined;
  usuario: string | undefined;
  foto: string | undefined;

  constructor(){}

  async ngOnInit(){
    const userCredential = await this.authfire.getUserData()
    this.nombre = userCredential.Nombre;
    this.usuario = userCredential.tipouser;
    this.foto = userCredential.foto;
  }

  cerrar() {
    this.authfire.logout();
    // this.auth.logout();
    this.router.navigate(['/inicio'])
    // window.location.reload();
    // localStorage.removeItem('swalShown');
  }
  

}
