import { RouterModule, Routes } from "@angular/router";
import { ProcesosLayoutComponent } from "./layouts/procesos-layout/procesos-layout.component";
import { CrearProcesoComponent } from "./pages/crear-proceso/crear-proceso.component";
import { NgModule } from "@angular/core";
import { ListadoProcesosComponent } from "./pages/listado-procesos/listado-procesos.component";

const routes: Routes = [

    {
      path: '',
      component: ProcesosLayoutComponent,
      children: [
        { path: 'crear/:id', component: CrearProcesoComponent },
        { path: 'listado', component: ListadoProcesosComponent },
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
export class ProcesosRoutingModule { }