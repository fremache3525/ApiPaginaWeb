import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { ApiUsuariosService } from '../../servicios/api/api-usuarios.service';
import {loginI} from '../../modelos/login.interface'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password : new FormControl('',Validators.required)
  })

  onLogin(form:any){
    //console.log(form)
    this.api.loginByUsuario(form).subscribe(data =>{
      console.log(data);
    });
  }
  constructor(private api:ApiUsuariosService){

  }
}
