import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Postulante } from 'src/app/postulantes/interfaces/postulante';
import { PostulantesService } from 'src/app/postulantes/services/postulantes.service';
import { Rol } from '../../interfaces/rol.interface';
import { ProcesosService } from '../../services/procesos.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Celula } from '../../interfaces/celula.interface';

@Component({
  selector: 'app-crear-proceso',
  templateUrl: './crear-proceso.component.html',
  styleUrls: ['./crear-proceso.component.css']
})
export class CrearProcesoComponent implements OnInit {

  public postulante?:Postulante;
  public roles:Rol [] = [];
  public clientes:Cliente [] = [];
  public celulas:Celula [] = [];

  public formProceso:FormGroup = this.fb.group({ 
    rol: ['', [ Validators.required ]],
    cliente: ['', [ Validators.required ]],
    celula: ['', [ Validators.required ]]
  });

  constructor(
    private fb:FormBuilder,
    private postulantesService:PostulantesService,
    private procesosService:ProcesosService, 
    private activatedRoute:ActivatedRoute,
    private router:Router 
  ){}

  ngOnInit(): void {
    this.obtenerPostulante();
    this.obtenerRoles();
    this.obtenerClientes();
    this.obtenerCelulas();
    this.onClienteChanged();
  }

  obtenerPostulante():void{
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.postulantesService.obtenerPostulantePorId( id )),
      )
      .subscribe( postulante => {
        
        if ( !postulante ) return this.router.navigateByUrl('');
        
        return this.postulante = postulante;
      });
  }

  obtenerRoles():void{
    this.procesosService.obtenerRoles()
    .subscribe( roles => {
      this.roles = roles;
    });
  }

  obtenerClientes():void{
    this.procesosService.obtenerClientes()
    .subscribe( clientes => {
      this.clientes = clientes;
    });
  }

  obtenerCelulas():void{
    this.procesosService.obtenerCelulas()
    .subscribe( celulas => {
      this.celulas = celulas;
    });
  }

  isValidField( field:string ): boolean | null {
    return this.formProceso.controls[field].errors 
      && this.formProceso.controls[field].touched;
  }

  getFieldError(field:string): string | null {

    if ( !this.formProceso.controls[field] ) return null;

    const errors = this.formProceso.controls[field].errors || {};

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
    console.log("Hola");
  }

  onClienteChanged():void{
    this.formProceso.get('cliente')?.valueChanges
      .subscribe(cells => {
        console.log({ cells })
      });
  }

}
