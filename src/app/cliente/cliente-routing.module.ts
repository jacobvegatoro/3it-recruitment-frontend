import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ClienteLayoutComponent } from "./layouts/cliente-layout.component";
import { CrearClienteComponent } from "./crear-cliente/crear-cliente.component";
import { ListadoClienteComponent } from "./listado-cliente/listado-cliente.component";
import { EditarClienteComponent } from "./editar-cliente/editar-cliente.component";

const routes: Routes = [

    {
      path: '',
      component: ClienteLayoutComponent,
      children: [
        { path: 'crear', component: CrearClienteComponent },
        { path: 'listado', component: ListadoClienteComponent },
        { path: 'actualizar/:id', component: EditarClienteComponent },
        { path: '**', redirectTo: 'listado' },
      ]
    }
  
  ];

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [
        RouterModule 
    ]
})
export class ClienteRoutingModule { }