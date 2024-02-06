import { ProcesosService } from 'src/app/procesos/services/procesos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EntrevistasService } from '../../services/entrevistas.service';
import { Entrevista } from '../../interfaces/entrevista.interface';
import { EntrevistaSave } from '../../interfaces/entrevista-save.interface';
import { Proceso } from 'src/app/procesos/interfaces/proceso.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-entrevista',
  templateUrl: './crear-entrevista.component.html',
  styleUrls: ['./crear-entrevista.component.css']
})
export class CrearEntrevistaComponent implements OnInit {

  public formEntrevista:FormGroup = this.fb.group({
    idProceso: ['', [ Validators.required ]],
    fecha_entrevista: ['', [ Validators.required ]],
    perfilBuscado: ['', [ Validators.required, Validators.minLength(3) ]],
    comentariosPrueba: ['', [ Validators.required, Validators.minLength(5) ]],
    comentariosGenerales: ['', [ Validators.required ] ],
    recomendaciones: ['', [ Validators.required ] ],
    descripcionPersonal: ['', [ Validators.required ] ],
    preguntasCandidato: ['', [ Validators.required ] ]
  });

  public accion:string = "";
  public entrevistas:Entrevista [] = [];
  public proceso:Proceso = {} as Proceso;
  public idPostulante?:number;
  public idEntrevista:number = 0;
  public entrevistaActual:EntrevistaSave = {} as EntrevistaSave;

  constructor (
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private entrevistasService:EntrevistasService,
    private procesosService:ProcesosService
  ){}

  ngOnInit(): void {
    this.obtenerProceso();
    this.obtenerEntrevistas();
  }

  obtenerProceso():void{
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.procesosService.obtenerProcesoPorId( id )),
      )
      .subscribe( proceso => {
        if ( !proceso ) return this.router.navigateByUrl('');

        this.entrevistaActual.idProceso = proceso.id;

        //console.log(proceso);
        this.proceso = proceso;
        this.idPostulante = proceso.postulante.id;
        return;
      });
  }

  obtenerEntrevistas():void{
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.entrevistasService.obtenerEntrevistasPorProceso( id )),
      )
      .subscribe( entrevistas => {
        //console.log(entrevistas);
        this.entrevistas = entrevistas;
        if (this.entrevistas.length > 0){
          this.accion = "editar";
          this.llenarEntrevistaActual(this.entrevistas[0]);
        }
        else{
          this.accion = "crear";
          this.entrevistaActual.idProceso = this.proceso.id;
          this.formEntrevista.reset(this.entrevistaActual);
        }
        return;
      });
  }

  llenarEntrevistaActual(entrevista:Entrevista):void{
    //console.log(entrevista);
    //this.entrevistaActual.id = entrevista.id;
    this.idEntrevista = entrevista.id;
    this.entrevistaActual.idProceso = this.proceso.id;

    if (entrevista.fecha_entrevista.length >= 15){
      this.entrevistaActual.fecha_entrevista = entrevista.fecha_entrevista.substring(0,16);
    }
    else{
      this.entrevistaActual.fecha_entrevista = entrevista.fecha_entrevista;
    }

    this.entrevistaActual.perfilBuscado = entrevista.perfilBuscado;
    this.entrevistaActual.comentariosPrueba = entrevista.comentariosPrueba;
    this.entrevistaActual.comentariosGenerales = entrevista.comentariosGenerales;
    this.entrevistaActual.recomendaciones = entrevista.recomendaciones;
    this.entrevistaActual.descripcionPersonal = entrevista.descripcionPersonal;
    this.entrevistaActual.preguntasCandidato = entrevista.preguntasCandidato;
    this.formEntrevista.reset(this.entrevistaActual);
    //this.entrevistaActual.idProceso = 0;    
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

    if ( this.formEntrevista.invalid ){
      this.formEntrevista.markAllAsTouched();
      return;
    }

    this.entrevistaActual = this.formEntrevista.value as EntrevistaSave;
    console.log(this.entrevistaActual);
    console.log(this.idEntrevista);

    if (this.accion == "crear"){
      this.entrevistasService.crearEntrevista( this.entrevistaActual )
      .subscribe({
        next: () => {
          Swal.fire({  
            text: "La entrevista ha sido creada exitosamente",
            icon: "success"
          });
          this.obtenerEntrevistas();
        },
        error: () => {
          Swal.fire('Error', 'Ocurrió un error al crear la entrevista', 'error');
        }
      });  
    }

    if (this.accion == "editar"){
      this.entrevistasService.editarEntrevista( this.entrevistaActual, this.idEntrevista )
      .subscribe({
        next: () => {
          Swal.fire({  
            text: "La entrevista ha sido editada exitosamente",
            icon: "success"
          });
          //this.obtenerEntrevistas();
        },
        error: () => {
          Swal.fire('Error', 'Ocurrió un error al editar la entrevista', 'error');
        }
      });  

    }


  }

}
