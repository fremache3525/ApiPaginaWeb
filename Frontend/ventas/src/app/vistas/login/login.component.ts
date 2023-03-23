import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { ApiUsuariosService } from '../../servicios/api/api-usuarios.service';
import {loginI} from '../../modelos/login.interface'
import {Router} from '@angular/router'
import {ResponseI} from '../../modelos/response.interface'

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
  ngOnInit(): void{
    this.checkLocalStorage();

  }
  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['products']);
    }
  }
  //
  
  errorStatus:boolean = false;
  errorMsj:any="";
  onLogin(form:any){
    //console.log(form)
    this.api.loginByUsuario(form).subscribe(data =>{
      console.log(data);
      let dataResponse:ResponseI = data;
      if(dataResponse.result == 1){
        localStorage.setItem("token",dataResponse.token);
        this.router.navigate(['products']);
      }else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.message;
      }
    });
  }
  constructor(private api:ApiUsuariosService, private router:Router){

  }
}
