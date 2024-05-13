import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
})
export class CrearClienteComponent implements OnInit {
  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        casaMatriz: ['', [Validators.required, Validators.minLength(3)]],
      },
    );
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
    const usuario = this.myForm.value;
    delete usuario.confirmarClave;

    this.clienteService.crearCliente(this.myForm.value).subscribe({
      next: () => {
        Swal.fire({
          text: 'El cliente ha sido creado exitosamente',
          icon: 'success',
        });
        this.myForm.reset();
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al crear el cliente', 'error');
      },
    });
  }
}
