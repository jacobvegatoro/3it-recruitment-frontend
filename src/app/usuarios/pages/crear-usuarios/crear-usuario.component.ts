import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuarios.service';
import { rolUsuario } from 'src/app/rolUsuario/interfaces/rol-usuario.interface';
import { RolUsuarioService } from '../../../rolUsuario/services/rol-usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  public myForm: FormGroup;
  public rolesUsuario: rolUsuario[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolUsuarioService: RolUsuarioService
  ) {}

  ngOnInit(): void {
    this.rolUsuarioService.obtenerRolesUsuario().subscribe((rolesUsuario) => {
      this.rolesUsuario = rolesUsuario;
    });

    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      confirmarClave: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+\d{9,15}$/)]],
      idRolUsuario: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator,
    });
  }

  passwordMatchValidator(control: AbstractControl){
    return control.get('clave')?.value ===
    control.get('confirmarClave')?.value 
    ? null
    : {mismatch: true}
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

        case 'email':
          return 'Ingrese un correo electrónico válido';
      }
    }

    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const usuario = this.myForm.value;
    delete usuario.confirmarClave;
  
    this.usuarioService.crearUsuario(usuario).subscribe({
      next: () => {
        Swal.fire({
          text: 'El usuario ha sido creado exitosamente',
          icon: 'success',
        });
        this.myForm.reset({
          nombre: '',
          apellido: '',
          login: '',
          clave: '',
          confirmarClave: '',
          correo: '',
          telefono: '',
          idRolUsuario: ''
        });
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al crear el usuario', 'error');
      },
    });
  }  
}
