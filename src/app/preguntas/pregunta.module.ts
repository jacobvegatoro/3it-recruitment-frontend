import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CrearPreguntaComponent } from './pages/crear-pregunta/crear-pregunta.component';
import { PreguntasLayoutComponent } from './layouts/preguntas-layout/preguntas-layout.component';
import { PreguntaRoutingModule } from './pregunta-routing.module';
import { ListadoPreguntasComponent } from './pages/listado-preguntas/listado-preguntas.component';
import { EditarPreguntaComponent } from './pages/editar-pregunta/editar-pregunta.component';



@NgModule({
  declarations: [
    PreguntasLayoutComponent,
    CrearPreguntaComponent,
    ListadoPreguntasComponent,
    EditarPreguntaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PreguntaRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class PreguntaModule { }
