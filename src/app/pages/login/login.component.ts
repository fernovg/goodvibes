import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/autenticacion.service';
import Swal from 'sweetalert2';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
  loading: boolean = false;

  request = {
    Usuario: "",
    Password: ""
  }

  user: string | undefined;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ){}

  logeo(){
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
    this.auth.authenticate(this.request).subscribe({
      next:(userInfo)=>{
        this.loading = false;
        if (!userInfo.result) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: userInfo.message,
            showConfirmButton: false, 
            timer: 1500
          });
          return;
        }      
        this.user = this.auth.currentUserValue.tipo;
        if(this.user == "user"){
          this.router.navigate(['/inicio'])
        }else if(this.user == "admin"){
          this.router.navigate(['/dashboard'])
        }
        
      },error: error=>{
        console.log(error);        
      }
    })
  }

}
