import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Celula } from 'src/app/procesos/interfaces/celula.interface';
import { CelulasService } from '../../services/celulas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-celulas',
  templateUrl: './listado-celulas.component.html',
  styleUrls: ['./listado-celulas.component.css']
})
export class ListadoCelulasComponent { 

  public isLoading: boolean = false;
  public dataSource = new MatTableDataSource<Celula>();
  public displayedColumns: string[] = ['id', 'nombre', 'cliente', 'casaMatriz', 'acciones'];

  constructor(private celulasService: CelulasService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerCelulas();
  }

  obtenerCelulas(): void {
    this.isLoading = true;
    this.celulasService.obtenerCelulas().subscribe({
      next: (celulas) => {
        console.log(celulas);
        this.dataSource.data = celulas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener las células:', error);
        this.isLoading = false;
      },
    });
  }

  eliminarCelula(id: number): void {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar esta célula con ID ${id}?`,
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.celulasService.eliminarCelula(id).subscribe({
          next: () => {
            this.obtenerCelulas();
            Swal.fire({
              title: "Eliminada",
              text: "La célula ha sido eliminada exitosamente.",
              icon: "success"
            });
          },
          error: (error) => {
            console.error('Error al eliminar la célula:', error);
            this.isLoading = false;
            Swal.fire('Error', 'Ocurrió un error al eliminar la célula', 'error');
          },
        });
      }
    });
  }

}
