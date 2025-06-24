import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private authfire = inject(AuthService)
  private router = inject(Router)

  loading: boolean = false;

  request = {
    Usuario: "",
    Password: ""
  }

  user: string | undefined;
  logini: boolean = false;

  constructor() { 
    this.isLoggedIn();
  }

  async logeo() {
    this.loading = true;
    if (this.request.Usuario == "") {
      this.loading = false;
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Campo Usuario Vacio",
        showConfirmButton: false,
        timer: 1500
      });
      return
    }
    if (this.request.Password == "") {
      this.loading = false;
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Campo Contraseña Vacio",
        showConfirmButton: false,
        timer: 1500
      });
      return
    }
    try {
      const userCredential = await this.authfire.login(this.request.Usuario, this.request.Password);
      this.loading = false;
      this.user = userCredential.tipouser;
      if (this.user == "user") {
        this.router.navigate(['/inicio'])
      } else if (this.user == "admin") {
        this.router.navigate(['/dashboard'])
      }

    } catch (error: any) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


  async logeoGoogle() {
    this.loading = true;
    try {
      const userCredential = await this.authfire.loginConGoogle();
      // this.router.navigate(['/inicio']);
      this.loading = false;
      this.user = userCredential.tipouser;
      if (this.user == "user") {
        this.router.navigate(['/inicio'])
      } else if (this.user == "admin") {
        this.router.navigate(['/dashboard'])
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error con Google",
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      this.loading = false;
    }
  }

    // si el usuario esta logeado lo manda a inicio
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
