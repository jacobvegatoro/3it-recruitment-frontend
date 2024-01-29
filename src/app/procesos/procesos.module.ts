import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesosLayoutComponent } from './layouts/procesos-layout/procesos-layout.component';
import { CrearProcesoComponent } from './pages/crear-proceso/crear-proceso.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoProcesosComponent } from './pages/listado-procesos/listado-procesos.component';



@NgModule({
  declarations: [
    ProcesosLayoutComponent,
    CrearProcesoComponent,
    ListadoProcesosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProcesosRoutingModule,
    ReactiveFormsModule
  ]
}) 
export class ProcesosModule { } 
