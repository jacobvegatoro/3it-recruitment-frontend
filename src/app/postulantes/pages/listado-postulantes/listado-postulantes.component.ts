import { Component, OnInit } from '@angular/core';
import { PostulantesService } from '../../services/postulantes.service';
import { Postulante } from '../../interfaces/postulante';

@Component({
  selector: 'app-listado-postulantes',
  templateUrl: './listado-postulantes.component.html',
  styleUrls: ['./listado-postulantes.component.css']
})
export class ListadoPostulantesComponent implements OnInit {

  public postulantes:Postulante [] = [];

  constructor(private postulantesService:PostulantesService){}

  buscarPorNombre( nombre:string ):void{
    console.log('Desde Listado de postulantes');
    console.log({ nombre });
    this.postulantesService.obtenerPostulantes()
      .subscribe( postulantes => {
        this.postulantes = postulantes;
        //console.log(this.postulantes);
      });
  }

  ngOnInit(): void {
    this.postulantesService.obtenerPostulantes()
    .subscribe( postulantes => {
      this.postulantes = postulantes;
    });
  }

}
