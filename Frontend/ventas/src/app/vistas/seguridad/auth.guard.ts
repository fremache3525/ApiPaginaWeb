import {Injectable} from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ApiUsuariosService } from 'src/app/servicios/api/api-usuarios.service';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private router:Router, private api:ApiUsuariosService){

    }
    canActivate(route:ActivatedRouteSnapshot){
        this.router.navigate(['login']);
        return false;
    }
}