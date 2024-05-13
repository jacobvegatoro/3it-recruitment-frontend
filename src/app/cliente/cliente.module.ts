import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClienteLayoutComponent } from './layouts/cliente-layout.component';
import { ListadoClienteComponent } from './listado-cliente/listado-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ClienteLayoutComponent,
    CrearClienteComponent,
    ListadoClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ClienteRoutingModule,
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
export class ClienteModule { }
