import { RouterModule, Routes } from "@angular/router";
import { CelulasLayoutComponent } from "./layouts/celulas-layout/celulas-layout.component";
import { ListadoCelulasComponent } from "./pages/listado-celulas/listado-celulas.component";
import { NgModule } from "@angular/core";
import { CrearCelulaComponent } from "./pages/crear-celula/crear-celula.component";
import { EditarCelulaComponent } from "./pages/editar-celula/editar-celula.component";

const routes: Routes = [

    {
      path: '',
      component: CelulasLayoutComponent,
      children: [
        { path: 'listado', component: ListadoCelulasComponent },
        { path: 'crear', component: CrearCelulaComponent },
        { path: 'editar/:id', component: EditarCelulaComponent },
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
export class CelulasRoutingModule { }