import { Component, OnInit, inject } from '@angular/core';
import { EstadisticasService } from '../../services/estadisticas.service';
import { DatosProcesos } from '../../interfaces/datos-procesos.interface';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-procesos-estadisticas',
  templateUrl: './procesos.component.html',
  styleUrls:['./procesos.component.css']
})

export class ProcesosEstadisticasComponent implements OnInit {
  private estadisticasService = inject(EstadisticasService)
  public datosProcesos:DatosProcesos[] = []
  public meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  public displayedColumns: string[] = ['mes', 'procesos'];
  public dataSource = new MatTableDataSource<DatosProcesos>();

  ngOnInit() {
    this.getEstadisticasProcesos();
  }

  getEstadisticasProcesos(){
    this.estadisticasService.obtenerUltimosProcesos()
    .subscribe(data=>{
      this.datosProcesos = data
      this.dataSource = new MatTableDataSource(this.datosProcesos);
    })
    }
}
