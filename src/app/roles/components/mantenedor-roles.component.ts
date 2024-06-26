import { Component, OnInit, inject } from '@angular/core';
import { MantenedorRolesService } from '../services/mantenedor-roles.service';
import { Rol } from '../interfaces/rol.interface';
import { MatSelectChange } from '@angular/material/select';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor ( private fb:FormBuilder){}

  public myForm:FormGroup = this.fb.group({
    cargo: ['', [ Validators.required, Validators.minLength(2) ]]
  });

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
  changeValue() {
    this.myForm.controls['cargo'].setValue(this.selectedData.detalle)
  }
  nuevoRol() {
    this.selectedData.id = 0;
    this.selectedData.detalle = this.myForm.controls['cargo'].value;
    if (this.myForm.invalid) {
      Swal.fire('Error', 'Debes ingresar un rol correctamente', 'error');
      return
    }
    this.mantenedorService.crearRol(this.selectedData)
    .subscribe({
      next: () => {
        Swal.fire({
          text: "El rol ha sido creado exitosamente",
          icon: "success"
        });
        this.obtenerRoles();
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al crear el rol', 'error');
      }
    });
  }

  onSave():void{
    this.selectedData.detalle = this.myForm.controls['cargo'].value;
    if (this.myForm.invalid) {
      Swal.fire('Error', 'Ocurrió un error al editar el rol', 'error');
      return
    }
    this.mantenedorService.editarRol(this.selectedData)
    .subscribe({
      next: () => {
        Swal.fire({
          text: "El rol ha sido editado exitosamente",
          icon: "success"
        });
        this.obtenerRoles();
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al editar el rol', 'error');
      }
    });
  }
}
