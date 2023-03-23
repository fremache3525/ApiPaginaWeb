import { Injectable } from '@angular/core';
import {loginI} from '../../modelos/login.interface'
import {ResponseI} from '../../modelos/response.interface'
import {listaProductosI} from '../../modelos/listaProductos.interface'
import { ProductoI } from 'src/app/modelos/producto.interface';
import {listaDetallesI} from 'src/app/modelos/listaDetalles.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  url:string = "http://localhost:57253/api/";
  constructor(private http:HttpClient) { }

  loginByUsuario(form:loginI):Observable<ResponseI>{
    let direccion  = this.url + "Usuarios/Ingresar"
    return this.http.post<ResponseI>(direccion, form);
  }

  obtenerProductos():Observable<listaProductosI[]>{
    let direccion = this.url+"Productos";

    return this.http.get<listaProductosI[]>(direccion);
  }

  obtenerUnProducto(id:any){
    let direccion = this.url+"Productos/"+id;
    return this.http.get<ProductoI>(direccion);
  }
  crearProducto(form:any):Observable<ResponseI>{
    let direccion = this.url+"Productos";
    return this.http.post<ResponseI>(direccion,form);
  }

  actualizarProducto(form:any, id:number):Observable<ResponseI>{
    let direccion = this.url+"Productos/";
    return this.http.put<ResponseI>(direccion+id,form);
  }
  eliminarProducto(form:any, id:number):Observable<ResponseI>{
    let direccion = this.url+"Productos/";
    let Options={
      headers: new HttpHeaders({
        'Content-type':'application/json'
      }),
      body:form
    }
    return this.http.delete<ResponseI>(direccion+id,Options);
  }
///////////////////USUARIOS
  crearUsuario(form:any):Observable<ResponseI>{
    let direccion = this.url+"Usuarios";
    return this.http.post<ResponseI>(direccion,form);
  }
//////////////VENTAS
crearDetalle(form:any):Observable<ResponseI>{
  let direccion = this.url+"Detalles";
  return this.http.post<ResponseI>(direccion,form);
}
obtenerDetalles():Observable<listaDetallesI[]>{
  let direccion = this.url+"Detalles";

  return this.http.get<listaDetallesI[]>(direccion);
}
obtenerDetallesUsuario(id:number):Observable<listaDetallesI[]>{
  let direccion = this.url+"DeatallesCompras/";

  return this.http.get<listaDetallesI[]>(direccion+id);
}










}
