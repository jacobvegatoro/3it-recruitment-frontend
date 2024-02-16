import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Proceso } from '../../interfaces/proceso.interface';
import { ProcesosService } from '../../services/procesos.service';
import { Celula } from '../../interfaces/celula.interface';
import { MatSort, Sort } from '@angular/material/sort';
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
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  private procesosService = inject( ProcesosService );

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {


    this.procesosService.obtenerProcesos()
    .subscribe(procesos => {
      this.procesos = procesos,
      this.isLoading = false;
    })


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource)
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
