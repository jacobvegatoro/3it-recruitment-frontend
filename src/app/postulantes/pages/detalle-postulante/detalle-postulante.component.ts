import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostulantesService } from '../../services/postulantes.service';
import { switchMap } from 'rxjs';
import { Postulante } from '../../interfaces/postulante';
import { Proceso } from 'src/app/procesos/interfaces/proceso.interface';
import { ProcesosService } from 'src/app/procesos/services/procesos.service';

@Component({
  selector: 'app-detalle-postulante',
  templateUrl: './detalle-postulante.component.html',
  styleUrls: ['./detalle-postulante.component.css']
})
export class DetallePostulanteComponent implements OnInit {

  public postulante?:Postulante;
  public procesos?:Proceso[];

  constructor( 
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private postulantesService:PostulantesService,
    private procesosService:ProcesosService 
  ){}

  obtenerProcesos(idPostulante:number):void{

    this.procesosService.obtenerProcesosPorPostulante(idPostulante)
      .subscribe({
        next: (result) => {
//          console.log(result);
          this.procesos = result;
        },
        error: () => {
          console.log('Ocurrió un error al obtener los procesos del postulante');
        }
      });

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.postulantesService.obtenerPostulantePorId( id )),
      )
      .subscribe( postulante => {
        
        if ( !postulante ) return this.router.navigateByUrl('');
        
        this.obtenerProcesos( postulante.id );

        return this.postulante = postulante;
      });
  }
  
}
