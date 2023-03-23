import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component'; //
import { ProductsComponent } from './vistas/products/products.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { EditarComponent } from './vistas/editar/editar.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},//
  {path:'login',component:LoginComponent},//
  {path:'products',component:ProductsComponent},//
  {path:'nuevo',component:NuevoComponent},//
  {path:'editar/:id',component:EditarComponent}//

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent]//