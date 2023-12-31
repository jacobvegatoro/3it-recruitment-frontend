import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPostulanteComponent } from './pages/crear-postulante/crear-postulante.component';
import { ListadoPostulantesComponent } from './pages/listado-postulantes/listado-postulantes.component';
import { EditarPostulanteComponent } from './pages/editar-postulante/editar-postulante.component';
import { DetallePostulanteComponent } from './pages/detalle-postulante/detalle-postulante.component';
import { PostulantesLayoutComponent } from './layouts/postulantes-layout/postulantes-layout.component';

/*const routes:Routes = [ 
    {
        path:'listado',
        component: ListadoPostulantesComponent
    },
    {
        path:'editar/:id',
        component: EditarPostulanteComponent
    },
    {
        path:'detalle/:id',
        component: DetallePostulanteComponent
    },
    {
        path:'crear',
        component: CrearPostulanteComponent
    }
];*/

const routes: Routes = [

    {
      path: '',
      component: PostulantesLayoutComponent,
      children: [
        { path: 'listado', component: ListadoPostulantesComponent },
        { path: 'editar/:id', component: EditarPostulanteComponent },
        { path: 'detalle/:id', component: DetallePostulanteComponent },
        { path: 'crear', component: CrearPostulanteComponent },
        { path: '**', redirectTo: 'listado' },
      ]
    }
  
  ];

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class PostulantesRoutingModule { }
