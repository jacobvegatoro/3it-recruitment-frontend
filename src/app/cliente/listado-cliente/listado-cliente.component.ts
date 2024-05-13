import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';

  import Swal from 'sweetalert2';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../interfaces/cliente.interface';


@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.component.html',
  styleUrls: ['./listado-cliente.component.css']
})
export class ListadoClienteComponent implements OnInit {
  
    public isLoading: boolean = false;
    public dataSource = new MatTableDataSource<Cliente>();
    public displayedColumns: string[] = ['id', 'nombre', 'casaMatriz', 'acciones'];
  
    constructor(
      private clienteService: ClienteService,
      ) {}
  
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  
    ngOnInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getAllCliente();
    }
    
    getAllCliente(): void {
      this.isLoading = true;
      this.clienteService.getAllCliente().subscribe({
        next: (clientes) => {
          this.dataSource.data = clientes;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al obtener los clientes:', error);
          this.isLoading = false;
        },
      });
    }
  
    eliminarCliente(id: string): void {
      Swal.fire({
        title: `¿Estás seguro de que deseas eliminar este cliente con ID ${id}?`,
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
          this.clienteService.eliminarCliente(id).subscribe({
            next: () => {
              this.getAllCliente();
              Swal.fire({
                title: "Eliminado",
                text: "El cliente ha sido eliminado exitosamente.",
                icon: "success"
              });
            },
            error: (error) => {
              console.error('Error al eliminar el cliente:', error);
              this.isLoading = false;
              Swal.fire('Error', 'Ocurrió un error al eliminar el cliente', 'error');
            },
          });
        }
      });
    }
  }

