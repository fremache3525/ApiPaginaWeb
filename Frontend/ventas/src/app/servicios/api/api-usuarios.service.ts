import { Injectable } from '@angular/core';
import {loginI} from '../../modelos/login.interface'
import {ResponseI} from '../../modelos/response.interface'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  url:string = "http://localhost:57253/api/";
  constructor(private http:HttpClient) { }

  loginByUsuario(form:loginI):Observable<ResponseI>{
    let direccion  = this.url + "Usuarios/Login"
    return this.http.post<ResponseI>(direccion, form);
  }
}
