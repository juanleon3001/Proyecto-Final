import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PrincipalComponent } from './components/principal/principal.component';


const routes: Routes = [
  {path:'cliente', component: ClientesComponent},
  {path:'pedido', component: PedidosComponent},
  {path:'producto', component: ProductosComponent},
  {path:'', component: PrincipalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
