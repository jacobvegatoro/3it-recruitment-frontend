import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente.interface';
import { CelulasService } from '../../services/celulas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-celula',
  templateUrl: './crear-celula.component.html',
  styleUrls: ['./crear-celula.component.css']
})
export class CrearCelulaComponent implements OnInit { 

  public myForm: FormGroup;
  public clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private celulasService: CelulasService
  ) {}

  ngOnInit(): void {
    this.celulasService.getAllClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });

    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      idCliente: ['', Validators.required],
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

    this.celulasService.crearCelula(this.myForm.value).subscribe({
      next: () => {
        Swal.fire({
          text: 'La célula ha sido creada exitosamente',
          icon: 'success',
        });
        this.ngOnInit();
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al crear la célula', 'error');
      },
    });
  }
  
}
