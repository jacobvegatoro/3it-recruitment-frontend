import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environments';
import { DatosEntrevistas } from '../interfaces/datos-entrevista.interface';

@Injectable({providedIn: 'root'})
export class EstadisticasService {

  private readonly apiUrl:string = environment.baseUrl;
  private http = inject( HttpClient );
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization',`Bearer ${ this.token }`);

  obtenerUltimasEntrevistas():Observable<DatosEntrevistas[]> {
    const url = `${this.apiUrl}/estadisticas/entrevistas`
    return this.http.get<DatosEntrevistas[]>(url, {headers: this.headers})
  }
}

