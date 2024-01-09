import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPostulantesComponent } from './pages/listado-postulantes/listado-postulantes.component';
import { CrearPostulanteComponent } from './pages/crear-postulante/crear-postulante.component';
import { EditarPostulanteComponent } from './pages/editar-postulante/editar-postulante.component';
import { PostulantesRoutingModule } from './postulantes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TablaPostulantesComponent } from './components/tabla-postulantes/tabla-postulantes.component';
import { DetallePostulanteComponent } from './pages/detalle-postulante/detalle-postulante.component';
import { RouterModule } from '@angular/router';
import { PostulantesLayoutComponent } from './layouts/postulantes-layout/postulantes-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListadoPostulantesComponent,
    CrearPostulanteComponent,
    EditarPostulanteComponent,
    TablaPostulantesComponent,
    DetallePostulanteComponent,
    PostulantesLayoutComponent
  ],
  imports: [
    CommonModule,
    PostulantesRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PostulantesModule { }
