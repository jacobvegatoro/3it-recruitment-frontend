import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EntrevistasLayoutComponent } from "./layouts/entrevistas-layout/entrevistas-layout.component";
import { CrearEntrevistaComponent } from "./pages/crear-entrevista/crear-entrevista.component";
import { ListadoEntrevistasComponent } from "./pages/listado-entrevistas/listado-entrevistas.component";

const routes: Routes = [
    {
        path: '',
        component: EntrevistasLayoutComponent,
        children: [
            { path: 'crear/:id', component: CrearEntrevistaComponent},
            { path: 'listado', component: ListadoEntrevistasComponent },
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
export class EntrevistasRoutingModule { }