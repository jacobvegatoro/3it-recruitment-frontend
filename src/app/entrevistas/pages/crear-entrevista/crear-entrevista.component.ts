import { RespuestaNueva } from './../../interfaces/respuesta-nueva.interface';
import { ProcesosService } from 'src/app/procesos/services/procesos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EntrevistasService } from '../../services/entrevistas.service';
import { EntrevistaSave } from '../../interfaces/entrevista-save.interface';
import { Proceso } from 'src/app/procesos/interfaces/proceso.interface';
import Swal from 'sweetalert2';
import { Pregunta } from '../../interfaces/pregunta.interface';
import { EntrevistaForm } from '../../interfaces/entrevista-form.interface';

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
    preguntasCandidato: ['', [ Validators.required ] ],
    ip1: ['', [  ]],
    tp1: ['', [  ]],
    tr1: ['', [  ]],
    pt1: ['', [  ]],
    ip2: ['', [  ]],
    tp2: ['', [  ]],
    tr2: ['', [  ]],
    pt2: ['', [  ]],
    ip3: ['', [  ]],
    tp3: ['', [  ]],
    tr3: ['', [  ]],
    pt3: ['', [  ]],
    ip4: ['', [  ]],
    tp4: ['', [  ]],
    tr4: ['', [  ]],
    pt4: ['', [  ]],
    ip5: ['', [  ]],
    tp5: ['', [  ]],
    tr5: ['', [  ]],
    pt5: ['', [  ]],
    ip6: ['', [  ]],
    tp6: ['', [  ]],
    tr6: ['', [  ]],
    pt6: ['', [  ]],
    ip7: ['', [  ]],
    tp7: ['', [  ]],
    tr7: ['', [  ]],
    pt7: ['', [  ]],
    ip8: ['', [  ]],
    tp8: ['', [  ]],
    tr8: ['', [  ]],
    pt8: ['', [  ]],
    ip9: ['', [  ]],
    tp9: ['', [  ]],
    tr9: ['', [  ]],
    pt9: ['', [  ]],
    ip10: ['', [  ]],
    tp10: ['', [  ]],
    tr10: ['', [  ]],
    pt10: ['', [  ]],
    ip11: ['', [  ]],
    tp11: ['', [  ]],
    tr11: ['', [  ]],
    pt11: ['', [  ]],
    ip12: ['', [  ]],
    tp12: ['', [  ]],
    tr12: ['', [  ]],
    pt12: ['', [  ]],
    ip13: ['', [  ]],
    tp13: ['', [  ]],
    tr13: ['', [  ]],
    pt13: ['', [  ]],
    ip14: ['', [  ]],
    tp14: ['', [  ]],
    tr14: ['', [  ]],
    pt14: ['', [  ]],
    ip15: ['', [  ]],
    tp15: ['', [  ]],
    tr15: ['', [  ]],
    pt15: ['', [  ]]
  });

  public accion:string = "";
  public proceso:Proceso = {} as Proceso;
  public entrevistas:EntrevistaSave [] = [];
  public entrevistaForm:EntrevistaForm = {} as EntrevistaForm;
  public preguntas:Pregunta [] = [];
  public idPostulante?:number;
  public idEntrevista:number = 0;
  public entrevistaActual:EntrevistaSave = {} as EntrevistaSave;
  public respuestasNuevas:RespuestaNueva [] = [];

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
          //this.entrevistaActual.idProceso = this.proceso.id;
          //this.obtenerPreguntasPorRol(this.proceso.rol.id);
          this.llenarEntrevistaNueva();
          //console.log(this.preguntas);
          //this.formEntrevista.reset(this.entrevistaActual);
        }
        return;
      });
  }

  obtenerPreguntasPorRol(idRol:number):void{
    this.entrevistasService.obtenerPreguntasPorRol(idRol)
    .subscribe( preguntas => {
      this.preguntas = preguntas;
      //console.log(this.preguntas);

      /*for (var pregunta in this.preguntas){

      }*/
      return;
    });
  }

  llenarEntrevistaNueva():void{
    console.log(this.proceso.id);
    console.log(this.proceso.rol.id);
    //console.log(this.preguntas);

    this.entrevistaForm.idProceso = this.proceso.id;

    this.entrevistasService.obtenerPreguntasPorRol(this.proceso.rol.id)
    .subscribe( preguntas => {
      this.preguntas = preguntas;
      this.entrevistaForm.tp1 = this.preguntas.at(0) != null ? this.preguntas.at(0)!.detalle : '';
      this.entrevistaForm.tp2 = this.preguntas.at(1) != null ? this.preguntas.at(1)!.detalle : '';
      this.entrevistaForm.tp3 = this.preguntas.at(2) != null ? this.preguntas.at(2)!.detalle : '';
      this.entrevistaForm.tp4 = this.preguntas.at(3) != null ? this.preguntas.at(3)!.detalle : '';
      this.entrevistaForm.tp5 = this.preguntas.at(4) != null ? this.preguntas.at(4)!.detalle : '';
      this.entrevistaForm.tp6 = this.preguntas.at(5) != null ? this.preguntas.at(5)!.detalle : '';
      this.entrevistaForm.tp7 = this.preguntas.at(6) != null ? this.preguntas.at(6)!.detalle : '';
      this.entrevistaForm.tp8 = this.preguntas.at(7) != null ? this.preguntas.at(7)!.detalle : '';
      this.entrevistaForm.tp9 = this.preguntas.at(8) != null ? this.preguntas.at(8)!.detalle : '';
      this.entrevistaForm.tp10 = this.preguntas.at(9) != null ? this.preguntas.at(9)!.detalle : '';
      this.entrevistaForm.tp11 = this.preguntas.at(10) != null ? this.preguntas.at(10)!.detalle : '';
      this.entrevistaForm.tp12 = this.preguntas.at(11) != null ? this.preguntas.at(11)!.detalle : '';
      this.entrevistaForm.tp13 = this.preguntas.at(12) != null ? this.preguntas.at(12)!.detalle : '';
      this.entrevistaForm.tp14 = this.preguntas.at(13) != null ? this.preguntas.at(13)!.detalle : '';
      this.entrevistaForm.tp15 = this.preguntas.at(14) != null ? this.preguntas.at(14)!.detalle : '';
      console.log(this.entrevistaForm);
      this.formEntrevista.reset(this.entrevistaForm);
    });

    return;
  }

  llenarEntrevistaActual(entrevista:EntrevistaSave):void{
    //console.log(entrevista);
    //this.entrevistaActual.id = entrevista.id;
    //this.idEntrevista = entrevista.id;
    this.entrevistaActual.idProceso = this.proceso.id;

    if (entrevista.fecha_entrevista.length >= 15){
      console.log(entrevista.fecha_entrevista);
      this.entrevistaActual.fecha_entrevista = entrevista.fecha_entrevista.substring(0,16);
      console.log(this.entrevistaActual.fecha_entrevista);
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

  prepararAlmacenamiento():void{
    //this.entrevistaActual.id = this.idEntrevista;
    this.entrevistaActual.fecha_entrevista = this.formEntrevista.get('fecha_entrevista')?.value;
    this.entrevistaActual.perfilBuscado = this.formEntrevista.get('perfilBuscado')?.value;
    this.entrevistaActual.comentariosPrueba = this.formEntrevista.get('comentariosPrueba')?.value;
    this.entrevistaActual.comentariosGenerales = this.formEntrevista.get('comentariosGenerales')?.value;
    this.entrevistaActual.recomendaciones = this.formEntrevista.get('recomendaciones')?.value;
    this.entrevistaActual.descripcionPersonal = this.formEntrevista.get('descripcionPersonal')?.value;
    this.entrevistaActual.preguntasCandidato = this.formEntrevista.get('preguntasCandidato')?.value;
    this.entrevistaActual.idProceso = this.formEntrevista.get('idProceso')?.value;
  }

  agregarEntrevista():void{
    this.entrevistaActual.idProceso = this.formEntrevista.get('idProceso')?.value;
    this.entrevistaActual.fecha_entrevista = this.formEntrevista.get('fecha_entrevista')?.value;
    this.entrevistaActual.perfilBuscado = this.formEntrevista.get('perfilBuscado')?.value;
    this.entrevistaActual.comentariosPrueba = this.formEntrevista.get('comentariosPrueba')?.value;
    this.entrevistaActual.comentariosGenerales = this.formEntrevista.get('comentariosGenerales')?.value;
    this.entrevistaActual.recomendaciones = this.formEntrevista.get('recomendaciones')?.value;
    this.entrevistaActual.descripcionPersonal = this.formEntrevista.get('descripcionPersonal')?.value;
    this.entrevistaActual.preguntasCandidato = this.formEntrevista.get('preguntasCandidato')?.value;

    console.log(this.entrevistaActual);
    let context=this;

    this.entrevistasService.crearEntrevista( this.entrevistaActual )
    .subscribe({
      next: (entrevistaNueva) => {
        //console.log(entrevistaNueva);
        //this.idEntrevista = entrevistaNueva.id;
        context.idEntrevista = entrevistaNueva.id;
        /*Swal.fire({  
          text: "La entrevista ha sido creada exitosamente",
          icon: "success"
        });*/
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al crear la entrevista', 'error');
      }
    });

    this.agregarRespuestas();

    return;
  }

  agregarRespuestas():void{
    this.respuestasNuevas = [];
    console.log(this.idEntrevista);

    if (this.formEntrevista.get('tp1')?.value != null && this.formEntrevista.get('tr1')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp1')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr1')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt1')?.value != null ? this.formEntrevista.get('pt1')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp2')?.value != null && this.formEntrevista.get('tr2')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp2')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr2')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt2')?.value != null ? this.formEntrevista.get('pt2')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp3')?.value != null && this.formEntrevista.get('tr3')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp3')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr3')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt3')?.value != null ? this.formEntrevista.get('pt3')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp4')?.value != null && this.formEntrevista.get('tr4')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp4')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr4')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt4')?.value != null ? this.formEntrevista.get('pt4')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp5')?.value != null && this.formEntrevista.get('tr5')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp5')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr5')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt5')?.value != null ? this.formEntrevista.get('pt5')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp6')?.value != null && this.formEntrevista.get('tr6')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp6')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr6')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt6')?.value != null ? this.formEntrevista.get('pt6')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp7')?.value != null && this.formEntrevista.get('tr7')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp7')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr7')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt7')?.value != null ? this.formEntrevista.get('pt7')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp8')?.value != null && this.formEntrevista.get('tr8')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp8')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr8')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt8')?.value != null ? this.formEntrevista.get('pt8')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp9')?.value != null && this.formEntrevista.get('tr9')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp9')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr9')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt9')?.value != null ? this.formEntrevista.get('pt9')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp10')?.value != null && this.formEntrevista.get('tr10')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp10')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr10')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt10')?.value != null ? this.formEntrevista.get('pt10')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }
    
    if (this.formEntrevista.get('tp11')?.value != null && this.formEntrevista.get('tr11')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp11')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr11')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt11')?.value != null ? this.formEntrevista.get('pt11')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp12')?.value != null && this.formEntrevista.get('tr12')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp12')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr12')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt12')?.value != null ? this.formEntrevista.get('pt12')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp13')?.value != null && this.formEntrevista.get('tr13')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp13')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr13')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt13')?.value != null ? this.formEntrevista.get('pt13')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp14')?.value != null && this.formEntrevista.get('tr14')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp14')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr14')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt14')?.value != null ? this.formEntrevista.get('pt14')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    if (this.formEntrevista.get('tp15')?.value != null && this.formEntrevista.get('tr15')?.value != null){
      let respuesta:RespuestaNueva = {} as RespuestaNueva;
      respuesta.textoPregunta = this.formEntrevista.get('tp15')?.value;
      respuesta.textoRespuesta = this.formEntrevista.get('tr15')?.value;
      respuesta.puntaje = this.formEntrevista.get('pt15')?.value != null ? this.formEntrevista.get('pt15')?.value : 0;
      respuesta.idEntrevista = this.idEntrevista;
      this.respuestasNuevas.push(respuesta);
    }

    console.log(this.respuestasNuevas);
    this.entrevistasService.crearRespuestasMultiples( this.respuestasNuevas )
    .subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        Swal.fire({  
          text: "La entrevista y las respuestas han sido creadas exitosamente",
          icon: "success"
        });
      },
      error: () => {
        Swal.fire('Error', 'La entrevista fue creada sin problemas, pero ocurrió un error al crear las respuestas', 'error');
      }
    });

    return;    
  }

  onSave():void{

    if ( this.formEntrevista.invalid ){
      this.formEntrevista.markAllAsTouched();
      return;
    }

    //this.entrevistaActual = this.formEntrevista.value as EntrevistaSave;
    //this.prepararAlmacenamiento();
    //console.log(this.entrevistaActual);
    //console.log(this.idEntrevista);

    if (this.accion == "crear"){
      this.agregarEntrevista();
      /*this.entrevistasService.crearEntrevista( this.entrevistaActual )
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
      });*/  
    }

    if (this.accion == "editar"){
      /*this.entrevistasService.editarEntrevista( this.entrevistaActual, this.idEntrevista )
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
      });*/  

    }


  }

}
