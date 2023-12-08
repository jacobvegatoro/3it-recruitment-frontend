import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostulantesService } from '../../services/postulantes.service';

@Component({
  selector: 'app-detalle-postulante',
  templateUrl: './detalle-postulante.component.html',
  styleUrls: ['./detalle-postulante.component.css']
})
export class DetallePostulanteComponent implements OnInit {

  constructor( 
    private activatedRoute:ActivatedRoute,
    private postulantesService:PostulantesService 
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ id }) => {

        this.buscarPostulante( id );

      });
  }
  
  buscarPostulante( id:string ){
    this.postulantesService.obtenerPostulantePorId( id )
    .subscribe ( postulante => {
      console.log( {postulante} );
    });
  }

}
