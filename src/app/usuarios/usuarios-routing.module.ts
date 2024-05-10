import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UsuariosLayoutComponent } from "./layouts/usuarios-layout.component";
import { CrearUsuarioComponent } from "./pages/crear-usuarios/crear-usuario.component";
import { ListadoUsuariosComponent } from "./pages/listado-usuarios/listado-usuarios.component";
import { EditarUsuariosComponent } from "./pages/editar-usuarios/editar-usuarios.component";

const routes: Routes = [

    {
      path: '',
      component: UsuariosLayoutComponent,
      children: [
        { path: 'crear', component: CrearUsuarioComponent },
        { path: 'listado', component: ListadoUsuariosComponent },
        { path: 'actualizar/:id', component: EditarUsuariosComponent },
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
export class UsuariosRoutingModule { }