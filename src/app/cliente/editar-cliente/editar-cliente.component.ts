import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      casaMatriz: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.loadCliente();
  }
  loadCliente(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.clienteService.getClienteById(id).subscribe({
      next: (cliente) => {
        this.myForm.patchValue(cliente);
      },
      error: () => {
        Swal.fire(
          'Error',
          'Ocurrió un error al cargar los datos del cliente',
          'error'
        );
      },
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
    const cliente = this.myForm.value;

    this.clienteService.actualizarCliente(id, cliente).subscribe({
      next: () => {
        Swal.fire({
          text: 'El cliente ha sido actualizado exitosamente',
          icon: 'success',
        });
        this.myForm.reset();
      },
      error: () => {
        Swal.fire(
          'Error',
          'Ocurrió un error al actualizar el cliente',
          'error'
        );
      },
    });
  }
}
