import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrevistasLayoutComponent } from './layouts/entrevistas-layout/entrevistas-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CrearEntrevistaComponent } from './pages/crear-entrevista/crear-entrevista.component';
import { EntrevistasRoutingModule } from './entrevistas-routing.module';
import { ListadoEntrevistasComponent } from './pages/listado-entrevistas/listado-entrevistas.component';
import { ReactiveFormsModule } from '@angular/forms';



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
    ReactiveFormsModule
  ]
})
export class EntrevistasModule { }
