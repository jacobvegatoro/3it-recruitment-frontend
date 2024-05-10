import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreguntaService } from '../../services/pregunta.service';
import Swal from 'sweetalert2';
import { Rol } from 'src/app/roles/interfaces/rol.interface';
import { MantenedorRolesService } from 'src/app/roles/services/mantenedor-roles.service';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.css'],
})
export class CrearPreguntaComponent implements OnInit {
  public myForm: FormGroup;
  public roles: Rol[] = [];

  constructor(
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private mantenedorRolesService: MantenedorRolesService
  ) {}

  ngOnInit(): void {
    this.mantenedorRolesService.obtenerRoles().subscribe((roles) => {
      this.roles = roles;
    });

    this.myForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.minLength(3)]],
      activo: [1, Validators.required],
      idRol: ['', Validators.required],
    });
  }

  isValidField(field: string): boolean | null {
    const control = this.myForm.get(field);
    return control ? control.errors && control.touched : null;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;

        case 'pattern':
          return 'El formato ingresado no es el esperado';
      }
    }

    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.preguntaService.crearPregunta(this.myForm.value).subscribe({
      next: () => {
        Swal.fire({
          text: 'La pregunta ha sido creado exitosamente',
          icon: 'success',
        });
        //this.myForm.reset();
        this.ngOnInit();
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al crear la pregunta', 'error');
      },
    });
  }
}
