import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { rolUsuario } from 'src/app/rolUsuario/interfaces/rol-usuario.interface';
import { RolUsuarioService } from 'src/app/rolUsuario/services/rol-usuario.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css'],
})
export class EditarUsuariosComponent implements OnInit {
  public generalForm: FormGroup;
  public passwordForm: FormGroup;
  public rolesUsuario: rolUsuario[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private rolUsuarioService: RolUsuarioService
  ) {}

  ngOnInit(): void {
    this.rolUsuarioService.obtenerRolesUsuario().subscribe((rolesUsuario) => {
      this.rolesUsuario = rolesUsuario;
    });

    this.generalForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [
        '',
        [Validators.required, Validators.pattern(/^\+\d{9,15}$/)],
      ],
      idRolUsuario: ['', Validators.required],
    });

    this.passwordForm = this.fb.group(
      {
        clave: ['', [Validators.required, Validators.minLength(6)]],
        confirmarClave: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    this.loadUsuario();
  }

  loadUsuario(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (usuario) => {
        this.generalForm.patchValue(usuario);
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al cargar los datos del usuario', 'error');
      },
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('clave')?.value === control.get('confirmarClave')?.value
      ? null
      : { mismatch: true };
  }

  isValidField(form: FormGroup, field: string): boolean | null {
    const control = form.get(field);
    return control ? control.errors && control.touched : null;
  }

  getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;

        case 'pattern':
          return 'El formato ingresado no es el esperado';

        case 'email':
          return 'Ingrese un correo electrónico válido';
      }
    }

    return null;
  }

  onSaveGeneral(): void {
    if (this.generalForm.invalid) {
      this.generalForm.markAllAsTouched();
      return;
    }
  
    const { id } = this.activatedRoute.snapshot.params;
    const usuarioData = this.generalForm.value;
  
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (usuarioActual) => {
        const usuario = {
          ...usuarioActual,
          ...usuarioData,
        };
  
        this.usuarioService.actualizarUsuario(id, usuario).subscribe({
          next: () => {
            Swal.fire({
              text: 'El usuario ha sido actualizado exitosamente',
              icon: 'success',
            });
          },
          error: (err) => {
            console.error('Error al actualizar usuario:', err);
            Swal.fire(
              'Error',
              'Ocurrió un error al actualizar el usuario',
              'error'
            );
          },
        });
      },
      error: (err) => {
        console.error('Error al obtener datos del usuario:', err);
        Swal.fire(
          'Error',
          'Ocurrió un error al obtener los datos del usuario',
          'error'
        );
      },
    });
  }  

  onSavePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { id } = this.activatedRoute.snapshot.params;

    this.usuarioService.getUsuarioById(id).subscribe({
      next: (usuario) => {
        const passwordData = {
          ...usuario,
          clave: this.passwordForm.value.clave,
        };

        this.usuarioService.actualizarUsuario(id, passwordData).subscribe({
          next: () => {
            Swal.fire({
              text: 'La clave ha sido actualizada exitosamente',
              icon: 'success',
            });
            this.passwordForm.reset();
          },
          error: () => {
            Swal.fire(
              'Error',
              'Ocurrió un error al actualizar la clave',
              'error'
            );
          },
        });
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al obtener los datos del usuario', 'error');
      },
    });
  }
}
