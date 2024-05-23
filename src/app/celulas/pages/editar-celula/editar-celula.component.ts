import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CelulasService } from '../../services/celulas.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-celula',
  templateUrl: './editar-celula.component.html',
  styleUrls: ['./editar-celula.component.css']
})
export class EditarCelulaComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    idCliente: ['', Validators.required]
  });
  public clientes: Cliente[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private celulasService: CelulasService,
  ) {}

  ngOnInit(): void {
    //console.log("Editar pregunta");
    this.loadCelula();
    this.celulasService.getAllClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  private loadCelula(): void {
    console.log("Entro a load");
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.celulasService.obtenerCelulaPorID(id)),
      )
      .subscribe(celula => {
        console.log('Célula obtenida:', celula);
        if (!celula) {
          this.router.navigateByUrl('');
          return;
        }
        console.log('Valores de la célula:', celula);
        this.myForm.patchValue({
          nombre: celula.nombre,
          idCliente: celula.cliente.id
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
    const celula = this.myForm.value;

    this.celulasService.actualizarCelula(id, celula).subscribe({
      next: () => {
        this.showSuccessMessage('La célula ha sido actualizada exitosamente');
      },
      error: () => {
        this.showErrorMessage('Ocurrió un error al actualizar la célula');
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
