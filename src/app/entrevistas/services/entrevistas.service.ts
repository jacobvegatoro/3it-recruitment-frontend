import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Entrevista } from '../interfaces/entrevista.interface';
import { EntrevistaSave } from '../interfaces/entrevista-save.interface';

@Injectable({
  providedIn: 'root'
})
export class EntrevistasService {

  private readonly apiUrl:string = environment.baseUrl;
  private http = inject( HttpClient );
  
  obtenerEntrevistasPorProceso(idProceso:number):Observable<Entrevista[]>{
    const url = `${this.apiUrl}/entrevistas/proceso/${idProceso}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);
      
    return this.http.get<Entrevista[]>( url, { headers } );
  }

  crearEntrevista(entrevista:EntrevistaSave):Observable<Entrevista>{
    const url = `${this.apiUrl}/entrevistas`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.post<Entrevista>(url, entrevista, { headers });
  } 

  editarEntrevista(entrevista:EntrevistaSave, id:number):Observable<Entrevista>{
    const url = `${ this.apiUrl }/entrevistas/${ id }`;
    //console.log(url);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.put<Entrevista>(url, entrevista, { headers });
  }

}
