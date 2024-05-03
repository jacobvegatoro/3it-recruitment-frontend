import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntaService } from '../../services/pregunta.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Pregunta } from '../../interfaces/pregunta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-preguntas',
  templateUrl: './listado-preguntas.component.html',
  styleUrls: ['./listado-preguntas.component.css']
})
export class ListadoPreguntasComponent implements OnInit {
  public isLoading: boolean = false;
  public dataSource = new MatTableDataSource<Pregunta>();
  public displayedColumns: string[] = ['id', 'detalle', 'activo', 'detalleRol', 'acciones'];

  constructor(private preguntaService: PreguntaService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerPreguntas();
  }

  obtenerPreguntas(): void {
    this.isLoading = true;
    this.preguntaService.obtenerPreguntas().subscribe({
      next: (preguntas) => {
        this.dataSource.data = preguntas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener las preguntas:', error);
        this.isLoading = false;
      },
    });
  }

  eliminarPregunta(id: number): void {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar esta pregunta con ID ${id}?`,
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
        this.preguntaService.eliminarPregunta(id).subscribe({
          next: () => {
            this.obtenerPreguntas();
            Swal.fire({
              title: "Eliminada",
              text: "La pregunta ha sido eliminada exitosamente.",
              icon: "success"
            });
          },
          error: (error) => {
            console.error('Error al eliminar la pregunta:', error);
            this.isLoading = false;
            Swal.fire('Error', 'Ocurrió un error al eliminar la pregunta', 'error');
          },
        });
      }
    });
  }
}
