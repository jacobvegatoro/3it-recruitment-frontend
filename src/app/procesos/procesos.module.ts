import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesosLayoutComponent } from './layouts/procesos-layout/procesos-layout.component';
import { CrearProcesoComponent } from './pages/crear-proceso/crear-proceso.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProcesosLayoutComponent,
    CrearProcesoComponent
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
