import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { Pregunta } from '../interfaces/pregunta.interface';
import { environment } from 'src/environments/environments';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  private readonly apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public cacheStore: CacheStore = {
    listadoPreguntas: { term: '', preguntas: [] },
  };

  saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  obtenerPreguntas(): Observable<Pregunta[]> {
    const url = `${this.apiUrl}/preguntas`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<Pregunta[]>(url, { headers })
      .pipe(catchError(() => []));
  }

  obtenerPreguntaPorID(id: number): Observable<Pregunta> {
    const url = `${this.apiUrl}/preguntas/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Pregunta[]>(url, { headers })
      .pipe(
        map(preguntas => preguntas.length > 0 ? preguntas[0] : null),
        filter(pregunta => pregunta !== null),
        map(pregunta => pregunta as Pregunta) 
      );
  }

  crearPreguntasMultiples(preguntas: Pregunta[]): Observable<Pregunta> {
    const url = `${this.apiUrl}/preguntas/multiples`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Pregunta>(url, preguntas, { headers });
  }

  obtenerPreguntasPorRol(idRol: number): Observable<Pregunta[]> {
    const url = `${this.apiUrl}/preguntas/rol/${idRol}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Pregunta[]>(url, { headers });
  }

  crearPregunta(pregunta: Pregunta): Observable<Pregunta> {
    const url = `${this.apiUrl}/preguntas/crear`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Pregunta>(url, pregunta, { headers });
  }

  actualizarPregunta(id: number, pregunta: Pregunta): Observable<Pregunta> {
    const url = `${this.apiUrl}/preguntas/actualizar/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Pregunta>(url, pregunta, { headers });
  }

  eliminarPregunta(id: number): Observable<Pregunta> {
    const url = `${this.apiUrl}/preguntas/eliminar/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Pregunta>(url, { headers });
  }
}
