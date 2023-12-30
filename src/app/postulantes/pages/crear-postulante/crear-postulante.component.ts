import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-postulante',
  templateUrl: './crear-postulante.component.html',
  styleUrls: ['./crear-postulante.component.css']
})
export class CrearPostulanteComponent implements OnInit {

  /*public myForm:FormGroup = new FormGroup({
    nombre: new FormControl('',[],[]),
    apellido: new FormControl('',[],[]),
    ciudad: new FormControl('',[],[]),
    enlaceBizneo: new FormControl('',[],[]),
  });*/

  private urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  public myForm:FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ]],
    apellido: ['', [ Validators.required, Validators.minLength(3) ]],
    ciudad: ['', [ Validators.required, Validators.minLength(5) ]],
    enlaceBizneo: ['', [Validators.required, Validators.pattern(this.urlRegex) ] ],
  });

  constructor ( private fb:FormBuilder ){}

  ngOnInit():void{

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

  onSave():void{

    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    } 

    console.log(this.myForm.value);

    this.myForm.reset();
    //this.myForm.reset({ enlaceBizneo: 'http://' });

  }

}
