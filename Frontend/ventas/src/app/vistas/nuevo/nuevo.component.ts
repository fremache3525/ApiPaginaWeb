import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoI } from 'src/app/modelos/producto.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { ApiUsuariosService } from 'src/app/servicios/api/api-usuarios.service';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent {

  productoid:any =0;
  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiUsuariosService, private alertas:AlertasService){
  }
  nuevoForm = new FormGroup({
    nombre: new FormControl(''),
    imagen: new FormControl(''),
    stock: new FormControl()
  });
  ngOnInit():void{
    let token = this.getToken();
   
     //console.log(this.editarForm.value);
  
  }
postForm(){
  this.api.crearProducto(this.nuevoForm.value).subscribe(data =>{
    //console.log(data);
    //let respuesta:ResponseI = data;
    /*if(respuesta.result == 1){
      this.alertas.showSucces('Datos Modificados','Hecho');
    
    }else{
      this.alertas.showError(respuesta.message,'Error')
    }*/
    this.alertas.showSucces('Datos Guardados','Hecho');
    this.router.navigate(['products']);
  })
  //console.log(this.editarForm.value);
}
salir(){
  this.router.navigate(['products']);
}

getToken(){
return localStorage.getItem('token');
}
}
