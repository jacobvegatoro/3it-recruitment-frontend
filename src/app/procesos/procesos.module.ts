import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesosLayoutComponent } from './layouts/procesos-layout/procesos-layout.component';
import { CrearProcesoComponent } from './pages/crear-proceso/crear-proceso.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoProcesosComponent } from './pages/listado-procesos/listado-procesos.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';


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
export class ProcesosModule { }
