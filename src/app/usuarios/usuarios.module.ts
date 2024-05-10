import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CrearUsuarioComponent } from './pages/crear-usuarios/crear-usuario.component';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { UsuariosLayoutComponent } from './layouts/usuarios-layout.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { EditarUsuariosComponent } from './pages/editar-usuarios/editar-usuarios.component';


@NgModule({
  declarations: [
    UsuariosLayoutComponent,
    CrearUsuarioComponent,
    ListadoUsuariosComponent,
    EditarUsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class UsuariosModule { }
