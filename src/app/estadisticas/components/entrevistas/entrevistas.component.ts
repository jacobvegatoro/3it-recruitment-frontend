import { Component, ViewChild, inject } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { EstadisticasService } from '../../services/estadisticas.service';
import { DatosEntrevistas } from '../../interfaces/datos-entrevista.interface';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-entrevistas-estadisticas',
  templateUrl: `./entrevistas.component.html`,
  styleUrls: ['./entrevistas.component.css'],
})
export class EntrevistasEstadisticasComponent {
@ViewChild(BaseChartDirective) chart: BaseChartDirective;
private estadisticasService = inject(EstadisticasService);
private paletaDeColores = {
  purple: "#5150C0"
}
public lineChartData: ChartConfiguration<'line'>['data'] = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Cantidad de Entrevistas',
      borderColor: this.paletaDeColores.purple,
      pointBackgroundColor: this.paletaDeColores.purple,
    }
  ]
};
public lineChartOptions: ChartOptions<'line'> = {
  responsive: false
};
public lineChartLegend = false;

ngOnInit() {
  this.getEstadisticasEntrevistas();
}

getEstadisticasEntrevistas() {
  this.estadisticasService.obtenerUltimasEntrevistas()
  .subscribe(datos => {
    datos.forEach((e: DatosEntrevistas)=> {
      this.lineChartData.labels?.push(`${e.mes}/${e.anio}`)
      this.lineChartData.datasets[0].data.push(e.cantidad_entrevistas)
    })
    this.chart.update()
  })
}
}

