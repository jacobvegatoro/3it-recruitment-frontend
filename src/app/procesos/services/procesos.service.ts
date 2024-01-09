import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Proceso } from '../interfaces/proceso.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  private readonly apiUrl:string = environment.baseUrl;
  private http = inject( HttpClient );

  obtenerProcesosPorPostulante(idPostulante:number):Observable<Proceso[]>{
    const url = `${this.apiUrl}/procesos/postulante/${idPostulante}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);
      
    return this.http.get<Proceso[]>( url, { headers } );
  }

}
