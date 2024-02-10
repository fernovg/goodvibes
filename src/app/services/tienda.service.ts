import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { prodTienda, registroP, borrarP, editarrP, producto } from '../models/tienda.models';
import { Environments } from 'src/environments/env.constant';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(
    private http: HttpClient
  ) { }

  getProd():Observable<prodTienda[]>{
    const url = `${Environments.API_ENDPOINT}/tienda/tienda.php`;
      return  this.http.get<prodTienda[]>(url)
  }

  getProdDes():Observable<prodTienda[]>{
    const url = `${Environments.API_ENDPOINT}/tienda/resProd.php`;
      return  this.http.get<prodTienda[]>(url)
  }

  getProducto(data:any){
    const body = new HttpParams()
       .set('Id',data.Id)
      return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/producto.php`, body).pipe(
        map((producto:producto) => {
            return producto;
        })
      )
  }

  regiProd(data:any){
    const body = new HttpParams()
            .set('Nombre',data.Nombre)
            .set('Descripcion', data.Descripcion)  
            .set('Precio',data.Precio)
            .set('Stock', data.Stock)
            .set('Cate', data.Cate)
            .set('Foto1', data.Foto1)
            .set('Foto2', data.Foto2)
            .set('Foto3', data.Foto3)
      return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/regiProd.php`, body).pipe(
            map((registroP:registroP) => {
                return registroP;
            })
    )
  }

  borrarProd(data:any){
    const body = new HttpParams()
            .set('Id',data.Id)
      return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/borrar.php`, body).pipe(
            map((borrarP:borrarP) => {
                return borrarP;
            })
    )
  }

  editarProd(data:any){
    const body = new HttpParams()
            .set('Id',data.Id)
            .set('Nombre',data.Nombre)
            .set('Descripcion', data.Descripcion)  
            .set('Precio',data.Precio)
            .set('Stock', data.Stock)
      return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/editar.php`, body).pipe(
            map((editarrP:editarrP) => {
                return editarrP;
            })
    )
  }
  
}
