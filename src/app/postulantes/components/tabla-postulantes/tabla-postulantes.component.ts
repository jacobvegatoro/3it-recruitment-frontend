import { Component, Input } from '@angular/core';
import { Postulante } from '../../interfaces/postulante';
import Swal from 'sweetalert2';
import { PostulantesService } from '../../services/postulantes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-postulantes',
  templateUrl: './tabla-postulantes.component.html',
  styleUrls: ['./tabla-postulantes.component.css']
})
export class TablaPostulantesComponent {

  @Input()
  public postulantes:Postulante[] = [];

  constructor(
    private postulantesService:PostulantesService,
    private router:Router,
  ){}

  onDeletePostulante(id:number):void{
    Swal.fire({
      title: `¿Está seguro que desea eliminar el postulante con ID ${id}?`,
      text: "No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.postulantesService.eliminarPostulantePorId( id )
        .subscribe({
          next: () => {
            Swal.fire({
              title: "Eliminado!",
              text: "El postulante ha sido eliminado.",
              icon: "success"
            });
            //this.router.navigateByUrl('postulantes/listado');
            //window.location.reload();
            this.actualizarListado();
          },
          error: () => {
            Swal.fire('Error', 'Ocurrió un error al eliminar el postulante', 'error');
          }
        });    
      }

    });
  }

  actualizarListado(): void {
    this.postulantesService.obtenerPostulantes()
    .subscribe( postulantes => {
      this.postulantes = postulantes;
    });
  }

}
