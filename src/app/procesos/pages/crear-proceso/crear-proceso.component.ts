import { EtapaProceso } from './../../interfaces/etapa-proceso.interface';
import { ProcesoSave } from './../../interfaces/proceso-save.interface';
import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Postulante } from 'src/app/postulantes/interfaces/postulante';
import { PostulantesService } from 'src/app/postulantes/services/postulantes.service';
import { Rol } from '../../interfaces/rol.interface';
import { ProcesosService } from '../../services/procesos.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Celula } from '../../interfaces/celula.interface';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Proceso } from '../../interfaces/proceso.interface';

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
  public procesos:Proceso [] = [];

  public formProceso:FormGroup = this.fb.group({ 
    idPostulante: [this.postulante?.id,[]],
    idRol: ['', [ Validators.required ]],
    idCliente: ['', [ Validators.required ]],
    idCelula: ['', [ Validators.required ]]
  });

  constructor(
    private fb:FormBuilder,
    private postulantesService:PostulantesService,
    private procesosService:ProcesosService, 
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private authService:AuthService 
  ){}

  ngOnInit(): void {
    this.obtenerPostulante();
    this.obtenerRoles();
    this.obtenerClientes();
    //this.obtenerCelulas();
    this.onClienteChanged();
    console.log(this.authService.currentUser()?.id);
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

  obtenerCelulasPorCliente(idCliente:number):void{
    if (idCliente != null && idCliente > 0){
      this.procesosService.obtenerCelulasPorCliente(idCliente)
      .subscribe( celulas => {
        this.celulas = celulas;
        this.formProceso.controls['idCelula'].setValue('', {onlySelf: true});
      });
    }
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
    //console.log("Hola");
    if ( this.formProceso.invalid ){
      this.formProceso.markAllAsTouched();
      return;
    }

    this.procesosService.crearProceso( this.currentProceso )
    .subscribe({
      next: (procesos) => {
        console.log(procesos[0]);
        this.crearEtapaInicial(procesos[0].id);
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al crear el proceso', 'error');
      }
    });

    this.formProceso.reset();
    this.formProceso.controls['idCliente'].setValue('', {onlySelf: true});
    this.formProceso.controls['idCelula'].setValue('', {onlySelf: true});
    this.formProceso.controls['idRol'].setValue('', {onlySelf: true});

  }

  crearEtapaInicial(idProceso:number):void{
    let etapaProceso:EtapaProceso = {
      comentario:"Proceso creado", 
      estado:"Pendiente", 
      idProceso:idProceso, 
      idEtapa:1, 
      idUsuario: this.authService.currentUser()?.id
    };

    this.procesosService.crearEtapaInicialProceso( etapaProceso )
    .subscribe({
      next: () => {
        Swal.fire({  
          text: "El proceso ha sido creado exitosamente",
          icon: "success"
        });
      },
      error: () => {
        Swal.fire({  
          text: "El proceso ha sido creado, pero con algunos inconvenientes",
          icon: "warning"
        });
      }
    });
  }

  onClienteChanged():void{
    this.formProceso.get('idCliente')?.valueChanges
      .subscribe(cells => {
        this.obtenerCelulasPorCliente(cells);
        console.log({ cells });
      });
  }

  get currentProceso():ProcesoSave {

    this.formProceso.patchValue({
      'idPostulante':this.postulante?.id
    });
    const proceso:ProcesoSave = {} as ProcesoSave;
    proceso.idPostulante = this.postulante?.id;
    proceso.idCelula = this.formProceso.controls['idCelula'].value;
    proceso.idRol = this.formProceso.controls['idRol'].value;

    return proceso;

  }

}
