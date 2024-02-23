import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { EntrevistasEstadisticasComponent } from "./components/entrevistas/entrevistas.component";
import { ProcesosEstadisticasComponent } from "./components/procesos/procesos.component";

@NgModule({
  declarations: [
    EntrevistasEstadisticasComponent,
    ProcesosEstadisticasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntrevistasEstadisticasComponent,
    ProcesosEstadisticasComponent
  ]
})

export class EstadisticasModule {}
