import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Entrevista } from '../interfaces/entrevista.interface';
import { EntrevistaSave } from '../interfaces/entrevista-save.interface';
import { Pregunta } from '../interfaces/pregunta.interface';
import { RespuestaNueva } from '../interfaces/respuesta-nueva.interface';
import { RespuestaExistente } from '../interfaces/respuesta-existente.interface';
import { EntrevistaInfo } from '../interfaces/entrevista-info.interface';

@Injectable({
  providedIn: 'root'
})
export class EntrevistasService {

  private readonly apiUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  
  obtenerEntrevistas(): Observable<EntrevistaInfo[]> {
    const url = `${this.apiUrl}/entrevistas`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<EntrevistaInfo[]>(url, { headers }).pipe(
      map((entrevistas: any[]) => {
        return entrevistas.map(entrevista => ({
          postulante: entrevista.proceso.postulante,
          rol: entrevista.proceso.rol,
          celula: entrevista.proceso.celula,
          fecha_entrevista: entrevista.fecha_entrevista
        }));
      })
    );
  }

  obtenerEntrevistasPorProceso(idProceso:number):Observable<EntrevistaSave[]>{
    const url = `${this.apiUrl}/entrevistas/proceso/${idProceso}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);
      
    return this.http.get<EntrevistaSave[]>( url, { headers } );
  }

  crearEntrevista(entrevista:EntrevistaSave):Observable<EntrevistaSave[]>{
    const url = `${this.apiUrl}/entrevistas/crear`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.post<EntrevistaSave[]>(url, entrevista, { headers });
  } 

  crearRespuestasMultiples(respuestas:RespuestaNueva[]):Observable<RespuestaNueva>{
    const url = `${this.apiUrl}/respuestas/multiples`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.post<RespuestaNueva>(url, respuestas, { headers });
  } 

  editarEntrevista(entrevista:EntrevistaSave, id:number):Observable<Entrevista>{
    const url = `${ this.apiUrl }/entrevistas/${ id }`;
    //console.log(url);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.put<Entrevista>(url, entrevista, { headers });
  }

  obtenerPreguntasPorRol(idRol:number):Observable<Pregunta[]>{
    const url = `${this.apiUrl}/preguntas/rol/${idRol}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);
      
    return this.http.get<Pregunta[]>( url, { headers } );
  }

  obtenerRespuestasPorEntrevista(idEntrevista:number):Observable<RespuestaExistente[]>{
    const url = `${this.apiUrl}/respuestas/entrevista/${idEntrevista}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);
      
    return this.http.get<RespuestaExistente[]>( url, { headers } );
  }

}
