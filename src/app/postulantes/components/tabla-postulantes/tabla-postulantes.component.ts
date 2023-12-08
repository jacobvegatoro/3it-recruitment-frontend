import { Component, Input } from '@angular/core';
import { Postulante } from '../../interfaces/postulante';

@Component({
  selector: 'app-tabla-postulantes',
  templateUrl: './tabla-postulantes.component.html',
  styleUrls: ['./tabla-postulantes.component.css']
})
export class TablaPostulantesComponent {

  @Input()
  public postulantes:Postulante[] = [];

}
