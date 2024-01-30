import { Component, OnInit, computed, inject } from '@angular/core';
import { PostulantesService } from '../../services/postulantes.service';
import { Postulante } from '../../interfaces/postulante';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-listado-postulantes',
  templateUrl: './listado-postulantes.component.html',
  styleUrls: ['./listado-postulantes.component.css']
})
export class ListadoPostulantesComponent implements OnInit {

  public postulantes:Postulante [] = [];
  public isLoading: boolean = false;
  public initialValue:string = '';

  private authService = inject( AuthService );

  public user = computed ( () => this.authService.currentUser() );
  
  constructor(private postulantesService:PostulantesService){}

  buscarPorNombre( nombre:string ):void{
    //console.log('Desde Listado de postulantes');
    //console.log({ nombre });
    this.isLoading = true;
    this.postulantesService.buscarPostulantePorNombre(nombre)
      .subscribe( postulantes => {
        this.postulantes = postulantes;
        this.isLoading = false;
        //console.log(this.postulantes);
      });
  }

  /*onLogout(){
    this.authService.logout();
  }*/

  ngOnInit(): void {

    if (!localStorage.getItem('cacheStore')){
      console.log('Obtengo todos los postulantes');
      this.isLoading = true;
      this.postulantesService.obtenerPostulantes()
      .subscribe( postulantes => {
        this.postulantes = postulantes;
        this.isLoading = false;
      });
    }
    else{
      this.postulantesService.loadFromLocalStorage();
    }

    this.postulantes = this.postulantesService.cacheStore.listadoPostulantes.postulantes;
    this.initialValue = this.postulantesService.cacheStore.listadoPostulantes.term;
  }

}
