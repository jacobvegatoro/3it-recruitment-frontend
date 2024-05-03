import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PreguntasLayoutComponent } from "./layouts/preguntas-layout/preguntas-layout.component";
import { CrearPreguntaComponent } from "./pages/crear-pregunta/crear-pregunta.component";
import { ListadoPreguntasComponent } from "./pages/listado-preguntas/listado-preguntas.component";
import { EditarPreguntaComponent } from "./pages/editar-pregunta/editar-pregunta.component";


const routes: Routes = [

    {
      path: '',
      component: PreguntasLayoutComponent,
      children: [
        { path: 'crear', component: CrearPreguntaComponent },
        { path: 'listado', component: ListadoPreguntasComponent },
        { path: 'editar/:id', component: EditarPreguntaComponent },
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
export class PreguntaRoutingModule { }