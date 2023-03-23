import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoI } from 'src/app/modelos/producto.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { ApiUsuariosService } from 'src/app/servicios/api/api-usuarios.service';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  
  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiUsuariosService, private alertas:AlertasService){
  }
  productoid:any =0;
 //datosProducto: ProductoI;
  editarForm = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(''),
    imagen: new FormControl(''),
    stock: new FormControl()
  });
  
  ngOnInit():void{
    this.productoid = this.activerouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.obtenerUnProducto(this.productoid).subscribe(data =>{
      //console.log(data);
      this.editarForm.setValue({
        'id': data.id,
        'nombre': data.nombre,
        'imagen': data.imagen,
        'stock': data.stock
      })
     //console.log(this.editarForm.value);
    })
  
  }

  postForm(){
    this.api.actualizarProducto(this.editarForm.value, this.productoid).subscribe(data =>{
      //console.log(this.editarForm.value);
      //let respuesta:ResponseI = data;
      /*if(respuesta.result == 1){
        this.alertas.showSucces('Datos Modificados','Hecho');
      
      }else{
        this.alertas.showError(respuesta.message,'Error')
      }*/
      this.alertas.showSucces('Datos Modificados','Hecho');
      this.router.navigate(['products']);
    })
    //console.log(this.editarForm.value);
  }
  eliminar(){
    this.api.eliminarProducto(this.editarForm.value, this.productoid).subscribe(data =>{
      this.router.navigate(['products'])
      //console.log(data);
      /*let respuesta:ResponseI = data;
      if(respuesta.result == 1){
        this.alertas.showSucces('Datos Eliminados','Hecho');
        this.router.navigate(['products'])
      }else{
        this.alertas.showError(respuesta.message,'Error')
      }*/
      this.alertas.showSucces('Datos Eliminados','Hecho');
      this.router.navigate(['products']);
    })
  }
  salir(){
      this.router.navigate(['products']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
