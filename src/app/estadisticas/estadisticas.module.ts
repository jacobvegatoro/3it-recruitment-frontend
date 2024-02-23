import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { EntrevistasEstadisticasComponent } from "./components/entrevistas/entrevistas.component";
import { ProcesosEstadisticasComponent } from "./components/procesos/procesos.component";
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    EntrevistasEstadisticasComponent,
    ProcesosEstadisticasComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  exports: [
    EntrevistasEstadisticasComponent,
    ProcesosEstadisticasComponent
  ]
})

export class EstadisticasModule {}
