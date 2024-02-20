import { Component, OnInit, inject } from '@angular/core';
import { MantenedorRolesService } from '../services/mantenedor-roles.service';
import { Rol } from '../interfaces/rol.interface';
import { MatSelectChange } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenedor-roles',
  templateUrl: './mantendor-roles.component.html',
  styleUrls: ['./mantenedor-roles.component.css']
})
export class MantenedorRolesComponent implements OnInit{
  private mantenedorService = inject( MantenedorRolesService );
  public roles:Rol[] = [];
  public seleccionado = null;
  public selectedData: Rol = {
    id: 0,
    detalle: ""
  };
  ngOnInit(): void {
    this.obtenerRoles();
  }
  selectedRol: string = "";
  selectedValue(event: MatSelectChange) {
    this.selectedData = {
      id: event.value,
      detalle: event.source.triggerValue
    };
  }
  obtenerRoles(){
    this.mantenedorService.obtenerRoles()
    .subscribe(rol=> {
      this.roles = rol
    })
  }
  nuevoRol() {
    this.mantenedorService.crearRol(this.selectedData)
    .subscribe({
      next: () => {
        Swal.fire({
          text: "El rol ha sido creado exitosamente",
          icon: "success"
        });
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al crear el rol', 'error');
      }
    });
    this.obtenerRoles();
  }

  onSave():void{
    console.log(this.selectedData)
    this.mantenedorService.editarRol(this.selectedData)
    .subscribe({
      next: () => {
        Swal.fire({
          text: "El rol ha sido editado exitosamente",
          icon: "success"
        });
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al editar el rol', 'error');
      }
    });
    this.obtenerRoles();
  }
}
