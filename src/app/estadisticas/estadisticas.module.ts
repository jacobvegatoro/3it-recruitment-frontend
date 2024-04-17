import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { EntrevistasEstadisticasComponent } from "./components/entrevistas/entrevistas.component";
import { ProcesosEstadisticasComponent } from "./components/procesos/procesos.component";
import { NgChartsModule } from 'ng2-charts';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    EntrevistasEstadisticasComponent,
    ProcesosEstadisticasComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    EntrevistasEstadisticasComponent,
    ProcesosEstadisticasComponent
  ]
})

export class EstadisticasModule {}
