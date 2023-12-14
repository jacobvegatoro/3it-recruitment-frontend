import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Postulante } from '../interfaces/postulante';

@Injectable({
  providedIn: 'root'
})
export class PostulantesService {

  private apiUrl:string = 'http://localhost:5000'

  constructor(private http:HttpClient) { }

  obtenerPostulantePorId( id:string ):Observable<Postulante | null>{
    const url = `${ this.apiUrl }/postulantes/${ id }`;
    return this.http.get<Postulante[]>( url )
      .pipe(
        map( postulantes => postulantes.length > 0 ? postulantes[0]: null),
        catchError( () => of(null) )
      );
  }

  obtenerPostulantes():Observable<Postulante[]>{
    const url = `${this.apiUrl}/postulantes`;
    return this.http.get<Postulante[]>( url );
  }

  buscarPostulantePorNombre( nombre:string ):Observable<Postulante[]>{
    const url = `${ this.apiUrl }/postulantes/buscar?keyword=${ nombre }`;
    return this.http.get<Postulante[]>( url );
  }

}
