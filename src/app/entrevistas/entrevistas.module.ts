import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrevistasLayoutComponent } from './layouts/entrevistas-layout/entrevistas-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CrearEntrevistaComponent } from './pages/crear-entrevista/crear-entrevista.component';
import { EntrevistasRoutingModule } from './entrevistas-routing.module';
import { ListadoEntrevistasComponent } from './pages/listado-entrevistas/listado-entrevistas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    EntrevistasLayoutComponent,
    CrearEntrevistaComponent,
    ListadoEntrevistasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    EntrevistasRoutingModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ]
})
export class EntrevistasModule { }
