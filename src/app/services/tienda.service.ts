import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { prodTienda, registroP, borrarP, editarP, producto, categorias, totalpCat, editStock, colecciones, temas, colores, registro } from '../models/tienda.models';
import { Environments } from 'src/environments/env.constant';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(
    private http: HttpClient
  ) { }

  getProd(): Observable<prodTienda[]> {
    const url = `${Environments.API_ENDPOINT}/tienda/tienda.php`;
    return this.http.get<prodTienda[]>(url)
  }

  getProdDes(): Observable<prodTienda[]> {
    const url = `${Environments.API_ENDPOINT}/tienda/resProd.php`;
    return this.http.get<prodTienda[]>(url)
  }

  getProducto(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/producto.php`, body).pipe(
      map((producto: producto) => {
        return producto;
      })
    )
  }

  regiProd(data: any) {
    const body = new HttpParams()
      .set('Nombre', data.Nombre)
      .set('Descripcion', data.Descripcion)
      .set('Precio', data.Precio)
      .set('Stock', data.Stock)
      .set('Cate', data.Cate)
      .set('Col', data.Col)
      .set('Tema', data.Tema)
      .set('Color', data.Color)
      .set('Foto1', data.Foto1)
      .set('Foto2', data.Foto2)
      .set('Foto3', data.Foto3)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/regiProd.php`, body).pipe(
      map((registroP: registroP) => {
        return registroP;
      })
    )
  }

  borrarProd(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/borrar.php`, body).pipe(
      map((borrarP: borrarP) => {
        return borrarP;
      })
    )
  }

  editarProd(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
      .set('Nombre', data.Nombre)
      .set('Descripcion', data.Descripcion)
      .set('Precio', data.Precio)
      .set('Stock', data.Stock)
      .set('Cate', data.Cate)
      .set('Col', data.Col)
      .set('Tema', data.Tema)
      .set('Color', data.Color)
      .set('Foto1', data.Foto1)
      .set('Foto2', data.Foto2)
      .set('Foto3', data.Foto3)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/editar.php`, body).pipe(
      map((editarP: editarP) => {
        return editarP;
      })
    )
  }

  getCategoria(): Observable<categorias[]> {
    const url = `${Environments.API_ENDPOINT}/tienda/datos/categoria.php`;
    return this.http.get<categorias[]>(url)
  }

  getPrpCate(): Observable<totalpCat[]> {
    const url = `${Environments.API_ENDPOINT}/tienda/totalprod.php`;
    return this.http.get<totalpCat[]>(url)
  }

  editarStock(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
      .set('Stock', data.Stock)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/editStock.php`, body).pipe(
      map((editStock) => {
        return editStock
      })
    )
  }

  getColecciones(): Observable<colecciones[]> {
    const url = `${Environments.API_ENDPOINT}/tienda/datos/colecciones.php`;
    return this.http.get<colecciones[]>(url)
  }

  getTemas(): Observable<temas[]> {
    const url = `${Environments.API_ENDPOINT}/tienda/datos/temas.php`;
    return this.http.get<temas[]>(url)
  }

  getColores(): Observable<colores[]> {
    const url = `${Environments.API_ENDPOINT}/tienda/datos/colores.php`;
    return this.http.get<colores[]>(url)
  }

  regiCategoria(data: any) {
    const body = new HttpParams()
      .set('Nombre', data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/addcategoria.php`, body).pipe(
      map((registro: registro) => {
        return registro;
      })
    )
  }

  regiColeccion(data: any) {
    const body = new HttpParams()
      .set('Nombre', data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/addcoleccion.php`, body).pipe
      (map((registro: registro) => {
        return registro;
      }))
  }

  regiTema(data: any) {
    const body = new HttpParams()
      .set('Nombre', data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/addtema.php`, body).pipe(
      map((registro: registro) => {
        return registro;
      }))
  }

  regiColor(data: any) {
    const body = new HttpParams()
      .set('Nombre', data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/addcolor.php`, body).pipe(
      map((registro: registro) => {
        return registro;
      }))
  }

  borrarCategoria(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/delcategoria.php`, body).pipe(
      map((registro: registro) => {
        return registro;
      })
    )
  }

  borrarColeccion(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/delcoleccion.php`, body).pipe(
      map((registro: registro) => {
        return registro;
      })
    )
  }

  borrarTema(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/deltema.php`, body).pipe(
      map((registro: registro) => {
        return registro;
      })
    )
  }

  borrarColor(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/delcolor.php`, body).pipe(
      map((registro: registro) => {
        return registro;
      })
    )
  }

  editarCategoria(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
      .set('Nombre', data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/editcategoria.php`, body).pipe(
      map((editStock) => {
        return editStock
      })
    )
  }

  editarColeccion(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
      .set('Nombre', data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/editcoleccion.php`, body).pipe(
      map((editStock) => {
        return editStock
      })
    )
  }

  editarTema(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
      .set('Nombre', data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/edittema.php`, body).pipe(
      map((editStock) => {
        return editStock
      })
    )
  }

  editarColor(data: any) {
    const body = new HttpParams()
      .set('Id', data.Id)
      .set('Nombre', data.Nombre)
    return this.http.post<any>(`${Environments.API_ENDPOINT}/tienda/admin/editcolor.php`, body).pipe(
      map((editStock) => {
        return editStock
      })
    )
  }


}