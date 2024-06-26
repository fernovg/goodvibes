import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ){}


  ngOnInit() {    
    const currentUser = this.auth.currentUserValue;
    
    if (currentUser && currentUser.tipo === "admin") {
      this.router.navigate(['/dashboard']);
    }
  }
  

}
