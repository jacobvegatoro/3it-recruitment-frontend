import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { EntrevistasService } from '../../services/entrevistas.service';
import { Entrevista } from '../../interfaces/entrevista.interface';

@Component({
  selector: 'app-crear-entrevista',
  templateUrl: './crear-entrevista.component.html',
  styleUrls: ['./crear-entrevista.component.css']
})
export class CrearEntrevistaComponent implements OnInit {

  private urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  public formEntrevista:FormGroup = this.fb.group({
    nombres: ['', [ Validators.required, Validators.minLength(3) ]],
    apellidos: ['', [ Validators.required, Validators.minLength(3) ]],
    ciudad: ['', [ Validators.required, Validators.minLength(5) ]],
    enlaceBizneo: ['', [Validators.required, Validators.pattern(this.urlRegex) ] ],
  });

  private accion:String = "";
  public entrevistas:Entrevista [] = [];

  constructor (
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private entrevistasService:EntrevistasService,
  ){}

  ngOnInit(): void {
    this.obtenerEntrevistas();
  }

  obtenerEntrevistas():void{
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.entrevistasService.obtenerEntrevistasPorProceso( id )),
      )
      .subscribe( entrevistas => {
        //if ( !postulante ) return this.router.navigateByUrl('');
        console.log(entrevistas);
        return this.entrevistas = entrevistas;
      });
  }

  isValidField( field:string ): boolean | null {
    return this.formEntrevista.controls[field].errors 
      && this.formEntrevista.controls[field].touched;
  }

  getFieldError(field:string): string | null {

    if ( !this.formEntrevista.controls[field] ) return null;

    const errors = this.formEntrevista.controls[field].errors || {};

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

  onSave():void{
  }

}
