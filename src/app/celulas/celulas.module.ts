import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CelulasLayoutComponent } from './layouts/celulas-layout/celulas-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListadoCelulasComponent } from './pages/listado-celulas/listado-celulas.component';
import { CelulasRoutingModule } from './celulas-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CrearCelulaComponent } from './pages/crear-celula/crear-celula.component';
import { EditarCelulaComponent } from './pages/editar-celula/editar-celula.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CelulasLayoutComponent,
    ListadoCelulasComponent,
    CrearCelulaComponent,
    EditarCelulaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CelulasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule    
  ]
})
export class CelulasModule { }
