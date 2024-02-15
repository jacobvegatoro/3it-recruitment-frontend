import { Component, Input, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Proceso } from '../../interfaces/proceso.interface';
import { ProcesosService } from '../../services/procesos.service';
import { Celula } from '../../interfaces/celula.interface';

@Component({
  selector: 'app-listado-procesos',
  templateUrl: './listado-procesos.component.html',
  styleUrls: ['./listado-procesos.component.css']
})
export class ListadoProcesosComponent implements OnInit {

  @Input()
  public procesos:Proceso [] = [];
  public celulas:Celula [] = [];
  public isLoading: boolean = false;
  public initialValue:string = '';

  private procesosService = inject( ProcesosService );

  ngOnInit(): void {

    this.procesosService.obtenerProcesos()
    .subscribe(procesos => {
      this.procesos = procesos,
      this.isLoading = false;
      console.log(procesos)
    })

  }


}
