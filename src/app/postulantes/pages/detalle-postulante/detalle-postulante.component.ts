import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostulantesService } from '../../services/postulantes.service';
import { switchMap } from 'rxjs';
import { Postulante } from '../../interfaces/postulante';

@Component({
  selector: 'app-detalle-postulante',
  templateUrl: './detalle-postulante.component.html',
  styleUrls: ['./detalle-postulante.component.css']
})
export class DetallePostulanteComponent implements OnInit {

  public postulante?:Postulante;

  constructor( 
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private postulantesService:PostulantesService 
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.postulantesService.obtenerPostulantePorId( id )),
      )
      .subscribe( postulante => {
        
        if ( !postulante ) return this.router.navigateByUrl('');
        
        return this.postulante = postulante;
        //console.log({ postulante })
        //return;
      });
  }
  
}
