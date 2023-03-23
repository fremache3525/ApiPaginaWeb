import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './plantillas/footer/footer.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { ProductsComponent } from './vistas/products/products.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { EditarComponent } from './vistas/editar/editar.component';

//import { ProductosComponent } from './vistas/productos/productos.component'
//import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
//import { LoginComponent } from './vistas/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FooterComponent,
    HeaderComponent,
    ProductsComponent,
    NuevoComponent,
    EditarComponent,
    //ProductosComponent
   // UsuariosComponent,
   // LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
