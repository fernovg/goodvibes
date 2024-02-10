import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManagerService } from './manager.service';
import { Environments } from 'src/environments/env.constant';

import { userReg, userEdit } from "../models/regisuser.models";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private managerservice:ManagerService,private http: HttpClient) { }

  registro(data:any){
    const body = new HttpParams()
            .set('Usuario',data.Usuario)
            .set('Nombre', data.Nombre)  
            .set('APaterno',data.APaterno)
            .set('AMaterno', data.AMaterno)
            .set('Correo', data.Correo)          
            .set('Password', data.Password)   
      return this.http.post<any>(`${Environments.API_ENDPOINT}/auth/registro.php`, body).pipe(
            map((userReg:userReg) => {
                return userReg;
            })
    )
  }

  editarPerfil(data:any){
    const body = new HttpParams()
          .set('Matricula',data.Matricula)
          .set('Nombre', data.Nombre)  
          .set('ApeP',data.ApeP)
          .set('ApeM', data.ApeM)
          .set('Usuario', data.Usuario)          
          .set('Foto', data.foto)   
      return this.http.post<any>(`${Environments.API_ENDPOINT}/perfil/editar.php`, body).pipe(
          map((userEdit:userEdit) => {
              return userEdit;
          })
      )
  }
}
