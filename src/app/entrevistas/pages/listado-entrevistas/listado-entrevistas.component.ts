import { Component, OnInit, ViewChild } from '@angular/core';
import { EntrevistaInfo } from '../../../entrevistas/interfaces/entrevista-info.interface';
import { EntrevistasService } from '../../../entrevistas/services/entrevistas.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-entrevistas',
  templateUrl: './listado-entrevistas.component.html',
  styleUrls: ['./listado-entrevistas.component.css'],
})
export class ListadoEntrevistasComponent implements OnInit {
  public isLoading: boolean = false;
  public dataSource = new MatTableDataSource<EntrevistaInfo>();
  public displayedColumns: string[] = [
    'postulante',
    'rol',
    'celula',
    'fechaHora',
  ];
  public initialValue: string = '';
  public tipoBusqueda: string[] = [];

  constructor(private entrevistasService: EntrevistasService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (object: any, property: string) => {
      switch (property) {
        case 'postulante':
          return object.proceso.postulante.nombres;
        case 'celula':
          return object.proceso.celula.nombre;
        case 'rol':
          return object.proceso.rol.detalle;
        case 'fechaHora':
          return object.fecha_entrevista;
        default:
          return object[property];
      }
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.obtenerEntrevistas();
  }

  obtenerEntrevistas(): void {
    this.isLoading = true;
    this.entrevistasService.obtenerEntrevistas().subscribe({
      next: (entrevistas) => {
        console.log('Entrevistas recibidas:', entrevistas);
        this.dataSource.data = entrevistas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener las entrevistas:', error);
        this.isLoading = false;
      },
    });
  }

  buscarEntrevistas(valorBusqueda: string): void {
    this.tipoBusqueda.forEach(tipo => {
      if (tipo === 'fecha') {
        this.buscarPorFecha(valorBusqueda);
      } else if (tipo === 'nombre') {
        this.buscarPorNombre(valorBusqueda);
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
    this.entrevistasService.buscarPorNombre(nombre).subscribe({
      next: (entrevistas) => {
        this.actualizarDataSource(entrevistas);
        this.isLoading = false;
      },
      error: this.handleError,
    });
  }

  buscarPorRol(rol: string): void {
    this.isLoading = true;
    this.entrevistasService.buscarPorRol(rol).subscribe({
      next: (entrevistas) => {
        this.actualizarDataSource(entrevistas);
        this.isLoading = false;
      },
      error: this.handleError,
    });
  }

  buscarPorCelula(nombreCelula: string): void {
    this.isLoading = true;
    this.entrevistasService.buscarPorCelula(nombreCelula).subscribe({
      next: (entrevistas) => {
        this.actualizarDataSource(entrevistas);
        this.isLoading = false;
      },
      error: this.handleError,
    });
  }

  buscarPorFecha(fecha: string): void {
    this.isLoading = true;
    this.entrevistasService.buscarPorFecha(fecha).subscribe({
      next: (entrevistas) => {
        this.actualizarDataSource(entrevistas);
        this.isLoading = false;
      },
      error: this.handleError,
    });
  }

  actualizarDataSource(entrevistas: EntrevistaInfo[]): void {
    this.dataSource.data = entrevistas.length > 0 ? entrevistas : [];
  }

  handleError = (error: any): void => {
    console.error('Error al buscar entrevistas:', error);
    this.isLoading = false;
  };
}
