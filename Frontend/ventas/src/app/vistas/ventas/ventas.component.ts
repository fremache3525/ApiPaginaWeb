import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoI } from 'src/app/modelos/producto.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { ApiUsuariosService } from 'src/app/servicios/api/api-usuarios.service';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { listaDetallesI } from 'src/app/modelos/listaDetalles.interface';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiUsuariosService, private alertas:AlertasService){
  }
  productoid:any =0;
  detalles:listaDetallesI[] =[];
 //datosProducto: ProductoI;
  editarForm = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(''),
    imagen: new FormControl(''),
    stock: new FormControl()
  });
  nuevoForm = new FormGroup({
    id_producto: new FormControl(),
    id_factura: new FormControl(),
    subtotal: new FormControl(),
    cantidad: new FormControl()
  });
  subtotalObtenido:string="";
  cantidadObtenido:string="";
  idObtenido:string="";
  public getInputValue(inputValue:string){
    console.log(inputValue);
    this.subtotalObtenido=inputValue;
  }
  public getInputValue2(inputValue:string){
    console.log(inputValue);
    this.cantidadObtenido=inputValue;
  }
  public getInputValue3(inputValue:string){
    console.log(inputValue);
    this.idObtenido=inputValue;
  }
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

    this.api.obtenerDetalles().subscribe(data =>{
      console.log(data);
      this.detalles = data;
    });
  
  }
  

  postForm(){
    this.nuevoForm.setValue({
      'id_producto': Number(this.idObtenido),
      'id_factura': Number(this.idObtenido),
      'subtotal': Number(this.subtotalObtenido),
      'cantidad': Number(this.cantidadObtenido)
    })
    this.api.crearDetalle(this.nuevoForm.value).subscribe(data =>{
      //console.log(this.editarForm.value);
      //let respuesta:ResponseI = data;
      /*if(respuesta.result == 1){
        this.alertas.showSucces('Datos Modificados','Hecho');
      
      }else{
        this.alertas.showError(respuesta.message,'Error')
      }*/
      this.alertas.showSucces('Detalles Agregado','Hecho');
      this.router.navigate(['products']);
    })
    //console.log(this.editarForm.value);
  }
  postForm1(){
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
