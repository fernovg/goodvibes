import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticacion.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  private authfire = inject(AuthService)
  private router = inject(Router)

  user: string | undefined;
  constructor(){}


  ngOnInit() {
    this.isLoggedIn();
  }

  async isLoggedIn() {
    if (this.authfire.isAuthenticated()) {
      // this.router.navigate(['/inicio'])
      const userCredential = await this.authfire.getUserData()
      this.user = userCredential.tipouser;
      if (this.user == "user") {
        this.router.navigate(['/inicio'])
      } else if (this.user == "admin") {
        this.router.navigate(['/dashboard'])
      }
    }
  }
  

}
