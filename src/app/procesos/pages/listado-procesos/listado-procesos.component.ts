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
  public procesos:Proceso [] = [];
  public celulas:Celula [] = [];
  public isLoading: boolean = false;
  public initialValue:string = '';
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['fecha_ingreso', 'postulante', 'celula', 'rol'];
  private procesosService = inject( ProcesosService );
  private _liveAnnouncer = inject(LiveAnnouncer);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.procesosService.obtenerProcesos()
    .subscribe(procesos => {
      this.dataSource.data = procesos

      // Soluciona el sorting para los elementos nested del objeto
      this.dataSource.sortingDataAccessor = (object:any, property) => {
        switch (property) {
          case "postulante":
            return object.postulante.nombres;
          case "celula":
            return object.celula.nombre;
          case "rol":
            return object.rol.detalle;
          default:
            return object[property];
        }
      }

      this.isLoading = false;
      this.dataSource.paginator = this.paginator;
      this.sort.sort(({ id: 'fecha_ingreso', start: 'desc'}) as MatSortable);
      this.dataSource.sort = this.sort;

      // Traducciones

      this.paginator._intl.itemsPerPageLabel="Items por página";
      this.paginator._intl.getRangeLabel = (page,pageSize,length)=>{
        if (length == 0 || pageSize == 0) {
            return `0 of ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} – ${endIndex} de ${length}`;
    }


      console.log(this.paginator._intl.getRangeLabel)
    })
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
