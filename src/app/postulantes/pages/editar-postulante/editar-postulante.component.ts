import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostulantesService } from '../../services/postulantes.service';
import { switchMap } from 'rxjs';
import { Postulante } from '../../interfaces/postulante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-postulante',
  templateUrl: './editar-postulante.component.html',
  styleUrls: ['./editar-postulante.component.css']
})
export class EditarPostulanteComponent implements OnInit {

  private urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  public postulante?:Postulante;

  public myForm:FormGroup = this.fb.group({
    id: ['', [ Validators.required ]],
    nombres: ['', [ Validators.required, Validators.minLength(3) ]],
    apellidos: ['', [ Validators.required, Validators.minLength(3) ]],
    ciudad: ['', [ Validators.required, Validators.minLength(5) ]],
    enlaceBizneo: ['', [Validators.required, Validators.pattern(this.urlRegex) ] ],
  });

  constructor ( 
    private activatedRoute:ActivatedRoute,
    private router:Router,    
    private fb:FormBuilder, 
    private postulantesService:PostulantesService 
  ){}

  ngOnInit():void{
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.postulantesService.obtenerPostulantePorId( id )),
      )
      .subscribe( postulante => {
        
        if ( !postulante ) return this.router.navigateByUrl('');
        
        this.myForm.reset(postulante);

        return this.postulante = postulante;
      });
  }

  isValidField( field:string ): boolean | null {
    return this.myForm.controls[field].errors 
      && this.myForm.controls[field].touched;
  }

  getFieldError(field:string): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for ( const key of Object.keys(errors) ){
      switch(key){
        case 'required':
          return 'Este campo es requerido';
        
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;
        
        case 'pattern':
          return 'El formato ingresado no es el esperado';
      }
    }

    return null;
  }

  get currentPostulante():Postulante {
    this.postulante = this.myForm.value as Postulante;
    return this.postulante;
  }

  onSave():void{

    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    } 

    console.log(this.currentPostulante);

    this.postulantesService.editarPostulante( this.currentPostulante )
    .subscribe({
      next: () => {
        Swal.fire({  
          text: "El postulante ha sido editado exitosamente",
          icon: "success"
        });
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al editar el postulante', 'error');
      }
    });

    //this.myForm.reset();

  }

}
