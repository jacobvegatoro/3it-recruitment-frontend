import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PreguntaService } from '../../services/pregunta.service';
import Swal from 'sweetalert2';
import { MantenedorRolesService } from 'src/app/roles/services/mantenedor-roles.service';
import { Rol } from 'src/app/roles/interfaces/rol.interface';

@Component({
  selector: 'app-editar-pregunta',
  templateUrl: './editar-pregunta.component.html',
  styleUrls: ['./editar-pregunta.component.css']
})
export class EditarPreguntaComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    detalle: ['', [Validators.required, Validators.minLength(3)]],
    activo: [true, Validators.required],
    idRol: ['', Validators.required]
  });
  public roles: Rol[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private mantenedorRolesService: MantenedorRolesService
  ) {}

  ngOnInit(): void {
    this.loadPregunta();
    this.mantenedorRolesService.obtenerRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  private loadPregunta(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.preguntaService.obtenerPreguntaPorID(id)),
      )
      .subscribe(pregunta => {
        console.log('Pregunta obtenida:', pregunta);
        if (!pregunta) {
          this.router.navigateByUrl('');
          return;
        }
        console.log('Valores de la pregunta:', pregunta);
        this.myForm.patchValue({
          detalle: pregunta.detalle,
          activo: pregunta.activo,
          idRol: pregunta.rol.id
        });
        console.log('Valores del formulario después de patchValue:', this.myForm.value);
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

    const { id } = this.activatedRoute.snapshot.params;
    const pregunta = this.myForm.value;

    this.preguntaService.actualizarPregunta(id, pregunta).subscribe({
      next: () => {
        this.showSuccessMessage('La pregunta ha sido actualizada exitosamente');
        this.myForm.reset();
      },
      error: () => {
        this.showErrorMessage('Ocurrió un error al actualizar la pregunta');
      },
    });
  }

  private showSuccessMessage(message: string): void {
    Swal.fire({
      text: message,
      icon: 'success',
    });
  }

  private showErrorMessage(message: string): void {
    Swal.fire('Error', message, 'error');
  }
}
