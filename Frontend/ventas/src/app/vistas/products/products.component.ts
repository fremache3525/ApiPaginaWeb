import { Component,OnInit } from '@angular/core';
import { ApiUsuariosService } from 'src/app/servicios/api/api-usuarios.service';
import { Router } from '@angular/router';
import { listaProductosI } from 'src/app/modelos/listaProductos.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private api:ApiUsuariosService, private router:Router){}
  productos:listaProductosI[] =[];
  ngOnInit():void{
    this.api.obtenerProductos().subscribe(data =>{
      console.log(data);
      this.productos = data;
    });
  }

  editarProducto(id:number){
    console.log(id)
    this.router.navigate(['editar', id]);
  }
  nuevoProducto(){
    this.router.navigate(['nuevo']);
  }


}