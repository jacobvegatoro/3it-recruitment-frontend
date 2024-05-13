import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from '../../interfaces/usuario.interface';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
  public isLoading: boolean = false;
  public dataSource = new MatTableDataSource<Usuario>();
  public displayedColumns: string[] = ['id', 'nombre', 'apellido', 'login', 'correo', 'acciones'];

  constructor(
    private usuarioService: UsuarioService,
    ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllUsuarios();
  }
  
  getAllUsuarios(): void {
    this.isLoading = true;
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.isLoading = false;
      },
    });
  }

  eliminarUsuario(id: string): void {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar este usuario con ID ${id}?`,
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
        this.usuarioService.eliminarUsuario(id).subscribe({
          next: () => {
            this.getAllUsuarios();
            Swal.fire({
              title: "Eliminado",
              text: "El usuario ha sido eliminado exitosamente.",
              icon: "success"
            });
          },
          error: (error) => {
            console.error('Error al eliminar el usuario:', error);
            this.isLoading = false;
            Swal.fire('Error', 'Ocurrió un error al eliminar el usuario', 'error');
          },
        });
      }
    });
  }
}
