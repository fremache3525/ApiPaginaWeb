import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoI } from 'src/app/modelos/producto.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { ApiUsuariosService } from 'src/app/servicios/api/api-usuarios.service';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { listaDetallesI } from 'src/app/modelos/listaDetalles.interface';

@Component({
  selector: 'app-compras-realizadas',
  templateUrl: './compras-realizadas.component.html',
  styleUrls: ['./compras-realizadas.component.css']
})
export class ComprasRealizadasComponent {
  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiUsuariosService, private alertas:AlertasService){
  }
  detalles:listaDetallesI[] =[];
  ngOnInit():void{
  

    this.api.obtenerDetallesUsuario(4).subscribe(data =>{
      console.log(data);
      this.detalles = data;
    });
  
  }
}
