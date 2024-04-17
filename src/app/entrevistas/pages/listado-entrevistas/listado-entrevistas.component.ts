import { Component, OnInit, ViewChild } from '@angular/core';
import { EntrevistaInfo } from '../../../entrevistas/interfaces/entrevista-info.interface';
import { EntrevistasService } from '../../../entrevistas/services/entrevistas.service';
import { Celula } from '../../../procesos/interfaces/celula.interface';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-entrevistas',
  templateUrl: './listado-entrevistas.component.html',
  styleUrls: ['./listado-entrevistas.component.css'],
})
export class ListadoEntrevistasComponent implements OnInit {
  public entrevistas: EntrevistaInfo[] = [];
  public celulas: Celula[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  public dataSource = new MatTableDataSource<EntrevistaInfo>();
  public displayedColumns: string[] = [
    'postulante',
    'rol',
    'celula',
    'fechaHora',
  ];

  constructor(
    private entrevistasService: EntrevistasService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.isLoading = true;
    this.entrevistasService.obtenerEntrevistas().subscribe({
      next: (entrevistas) => {
        console.log('Entrevistas recibidas:', entrevistas);
        this.entrevistas = entrevistas;
        this.dataSource.data = entrevistas;

        this.dataSource.sortingDataAccessor = (
          object: any,
          property: string
        ) => {
          switch (property) {
            case 'postulante':
              return object.postulante.nombres;
            case 'celula':
              return object.celula.nombre;
            case 'rol':
              return object.rol.detalle;
            case 'fechaHora':
              return object.fecha_entrevista;
            default:
              return object[property];
          }
        };
        this.isLoading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error al obtener las entrevistas:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('La operación del Observable ha finalizado correctamente');
      },
    });

    // Traducciones
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.getRangeLabel = (page, pageSize, length) => {
      if (length == 0 || pageSize == 0) {
        return `0 of ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  }

  if (sortState: { direction: any; }) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }  
}
