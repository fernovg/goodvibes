import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Environments } from 'src/environments/env.constant';
import { galeria, resPubli, totalPub } from '../models/galeria.models';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(
    private http: HttpClient
  ) { }

    getGaleria():Observable<galeria[]>{
      const url = `${Environments.API_ENDPOINT}/galeria/galeria.php`;
        return  this.http.get<galeria[]>(url)
    }

    getTotal():Observable<totalPub>{
      const url = `${Environments.API_ENDPOINT}/galeria/totalGale.php`;
        return this.http.get<totalPub>(url)
    }

    getPubli(data:any){
      const body = new HttpParams()
              .set('Foto',data.Foto)
              .set('Descripcion', data.Descripcion)
              .set('Matricula', data.Matricula)
        return this.http.post<any>(`${Environments.API_ENDPOINT}/galeria/publicar.php`, body).pipe(
              map((resPubli:resPubli) => {
                  return resPubli;
              })
      )
    }

    borrar(data:any){
      const body = new HttpParams()
            .set('Id',data.Id)
      return this.http.post<any>(`${Environments.API_ENDPOINT}/galeria/borrar.php`, body).pipe(
            map((resPubli:resPubli) => {
                return resPubli;
            })
      )
    }

}
