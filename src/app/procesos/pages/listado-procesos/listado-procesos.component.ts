import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Proceso } from '../../interfaces/proceso.interface';
import { ProcesosService } from '../../services/procesos.service';
import { Celula } from '../../interfaces/celula.interface';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-procesos',
  templateUrl: './listado-procesos.component.html',
  styleUrls: ['./listado-procesos.component.css']
})
export class ListadoProcesosComponent implements OnInit {
  public procesos: Proceso[] = [];
  public celulas: Celula[] = [];
  public isLoading: boolean = false;
  public dataSource = new MatTableDataSource<Proceso>();
  public displayedColumns: string[] = ['fecha_ingreso', 'postulante', 'celula', 'rol'];
  private procesosService = inject(ProcesosService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  public tipoBusqueda: string[] = [];
  public nombre: string = '';
  public apellido: string = '';  
  public rol: string = '';
  public celula: string = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.obtenerProcesos();
  }

  obtenerProcesos() {
    this.isLoading = true;
    this.procesosService.obtenerProcesos()
      .subscribe(procesos => {
        this.dataSource.data = procesos;
        this.isLoading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  buscarProcesos(valorBusqueda: string): void {
    this.tipoBusqueda.forEach(tipo => {
      if (tipo === 'nombre') {
        const [nombre] = valorBusqueda.split(' ');
        this.buscarPorNombre(nombre);
      } else if (tipo === 'apellido') {
        this.buscarPorApellido(valorBusqueda);
      } else if (tipo === 'rol') {
        this.buscarPorRol(valorBusqueda);
      } else if (tipo === 'celula') {
        this.buscarPorCelula(valorBusqueda);
      }
    });
  }  

  toggleTipoBusqueda(opcion: string): void {
    if (this.tipoBusqueda.includes(opcion)) {
      this.tipoBusqueda = this.tipoBusqueda.filter(item => item !== opcion);
    } else {
      this.tipoBusqueda = [opcion];
    }
  } 
  buscarPorNombre(nombre: string): void {
    this.isLoading = true;
    this.procesosService.buscarPorNombre(nombre).subscribe({
      next: (procesos) => {
        this.actualizarDataSource(procesos);
        this.isLoading = false;
      },
      error: this.handleError,
    });
  }

  buscarPorApellido(apellido: string): void {
    this.isLoading = true;
    this.procesosService.buscarPorApellido(apellido).subscribe({
      next: (procesos) => {
        this.actualizarDataSource(procesos);
        this.isLoading = false;
      },
      error: this.handleError,
    });
  }

  buscarPorRol(rol: string): void {
    this.isLoading = true;
    this.procesosService.buscarPorRol(rol).subscribe({
      next: (procesos) => {
        this.actualizarDataSource(procesos);
        this.isLoading = false;
      },
      error: this.handleError,
    });
  }

  buscarPorCelula(celula: string): void {
    this.isLoading = true;
    this.procesosService.buscarPorCelula(celula).subscribe({
      next: (procesos) => {
        this.actualizarDataSource(procesos);
        this.isLoading = false;
      },
      error: this.handleError,
    });
  }
  actualizarDataSource(entrevistas: Proceso[]): void {
    this.dataSource.data = entrevistas.length > 0 ? entrevistas : [];
  }

  handleError = (error: any): void => {
    console.error('Error al buscar entrevistas:', error);
    this.isLoading = false;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
