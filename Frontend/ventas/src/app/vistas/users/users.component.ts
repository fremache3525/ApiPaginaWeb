import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoI } from 'src/app/modelos/producto.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { ApiUsuariosService } from 'src/app/servicios/api/api-usuarios.service';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  
  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiUsuariosService, private alertas:AlertasService){
  }
  nuevoForm = new FormGroup({
    nombre: new FormControl(''),
    cedula: new FormControl(''),
    password: new FormControl(''),
    idEstatus: new FormControl(1),
    token: new FormControl('')
  });
  ngOnInit():void{
    let token = this.getToken();
     //console.log(this.editarForm.value);
  
  }
  
  postForm(){
    this.api.crearUsuario(this.nuevoForm.value).subscribe(data =>{
      console.log(this.nuevoForm.value);
      this.alertas.showSucces('Usuario Guardado','Hecho');
      this.router.navigate(['login']);
    })
    //console.log(this.editarForm.value);
  }
  salir(){
    this.router.navigate(['login']);
  }
  
  getToken(){
  return localStorage.getItem('token');
  }
}
