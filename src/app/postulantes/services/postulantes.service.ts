import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postulante } from '../interfaces/postulante';

@Injectable({
  providedIn: 'root'
})
export class PostulantesService {

  private apiUrl:string = 'http://localhost:5000'

  constructor(private http:HttpClient) { }

  obtenerPostulantePorId( id:string ):Observable<Postulante[]>{
    const url = `${ this.apiUrl }/postulantes/${ id }`;
    return this.http.get<Postulante[]>( url );
  }

  obtenerPostulantes():Observable<Postulante[]>{
    const url = `${this.apiUrl}/postulantes`;
    return this.http.get<Postulante[]>( url );
  }

}
