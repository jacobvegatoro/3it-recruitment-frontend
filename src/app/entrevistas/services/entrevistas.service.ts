import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Entrevista } from '../interfaces/entrevista.interface';
import { EntrevistaSave } from '../interfaces/entrevista-save.interface';
import { Pregunta } from '../interfaces/pregunta.interface';
import { RespuestaNueva } from '../interfaces/respuesta-nueva.interface';
import { RespuestaExistente } from '../interfaces/respuesta-existente.interface';
import { EntrevistaInfo } from '../interfaces/entrevista-info.interface';
import { CacheStore } from '../interfaces/cache-store-entrevista.interface';

@Injectable({
  providedIn: 'root',
})
export class EntrevistasService {
  private readonly apiUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  private entrevistasSubject = new BehaviorSubject<EntrevistaInfo[]>([]);
  entrevistas$ = this.entrevistasSubject.asObservable();
  
  public cacheStore:CacheStore = {
    listadoEntrevistas: { term: '', entrevistas: [] }
  }

  saveToLocalStorage(){
    localStorage.setItem( 'cacheStore', JSON.stringify (this.cacheStore) );
  }

  loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  obtenerEntrevistas(): Observable<EntrevistaInfo[]> {
    const url = `${this.apiUrl}/entrevistas`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<EntrevistaInfo[]>(url, { headers }).pipe(
      map((entrevistas: any[]) => {
        return entrevistas.map((entrevista) => ({
          postulante: entrevista.proceso.postulante,
          rol: entrevista.proceso.rol,
          celula: entrevista.proceso.celula,
          fecha_entrevista: entrevista.fecha_entrevista,
        }));
      })
    ); 
  }

  buscarPorNombre(nombre: string): Observable<EntrevistaInfo[]> {
    const url = `${this.apiUrl}/entrevistas/buscar/nombre`;
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const params = new HttpParams().set('nombre', nombre);
  
    return this.http.get<EntrevistaInfo[]>(url, { headers, params }).pipe(
      tap(entrevistas => {
        console.log('Entrevistas encontradas por nombre:', entrevistas);
        this.entrevistasSubject.next(entrevistas);
        this.cacheStore.listadoEntrevistas = { 'term': nombre, 'entrevistas': entrevistas };
        this.saveToLocalStorage();
      }),
      catchError((error: any) => {
        console.error('Error al buscar entrevistas:', error);
        throw error;
      })
    );
  }  

  buscarPorRol(rol: string): Observable<EntrevistaInfo[]> {
    const url = `${this.apiUrl}/entrevistas/buscar/rol`;
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const params = new HttpParams().set('rol', rol);
  
    return this.http.get<EntrevistaInfo[]>(url, { headers, params }).pipe(
      tap(entrevistas => {
        console.log('Entrevistas encontradas por rol:', entrevistas);
        this.entrevistasSubject.next(entrevistas);
        this.cacheStore.listadoEntrevistas = { 'term': rol, 'entrevistas': entrevistas };
        this.saveToLocalStorage();
      }),
      catchError((error: any) => {
        console.error('Error al buscar entrevistas por rol:', error);
        throw error;
      })
    );
  }

  buscarPorCelula(celula: string): Observable<EntrevistaInfo[]> {
    const url = `${this.apiUrl}/entrevistas/buscar/celula`;
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const params = new HttpParams().set('celula', celula);
  
    return this.http.get<EntrevistaInfo[]>(url, { headers, params }).pipe(
      tap(entrevistas => {
        console.log('Entrevistas encontradas por celula:', entrevistas);
        this.entrevistasSubject.next(entrevistas);
        this.cacheStore.listadoEntrevistas = { 'term': celula, 'entrevistas': entrevistas };
        this.saveToLocalStorage();
      }),
      catchError((error: any) => {
        console.error('Error al buscar entrevistas por célula:', error);
        throw error;
      })
    );
  }

  buscarPorFecha(fecha: string): Observable<EntrevistaInfo[]> {
    const url = `${this.apiUrl}/entrevistas/buscar/fecha`;
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const params = new HttpParams().set('fecha', fecha);
  
    return this.http.get<EntrevistaInfo[]>(url, { headers, params }).pipe(
      tap(entrevistas => {
        console.log('Entrevistas encontradas por fecha:', entrevistas);
        this.entrevistasSubject.next(entrevistas);
        this.cacheStore.listadoEntrevistas = { 'term': fecha, 'entrevistas': entrevistas };
        this.saveToLocalStorage();
      }),
      catchError((error: any) => {
        console.error('Error al buscar entrevistas por fecha:', error);
        throw error;
      })
    );
  }
  
  obtenerEntrevistasPorProceso(
    idProceso: number
  ): Observable<EntrevistaSave[]> {
    const url = `${this.apiUrl}/entrevistas/proceso/${idProceso}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<EntrevistaSave[]>(url, { headers });
  }

  crearEntrevista(entrevista: EntrevistaSave): Observable<EntrevistaSave[]> {
    const url = `${this.apiUrl}/entrevistas/crear`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<EntrevistaSave[]>(url, entrevista, { headers });
  }

  crearRespuestasMultiples(
    respuestas: RespuestaNueva[]
  ): Observable<RespuestaNueva> {
    const url = `${this.apiUrl}/respuestas/multiples`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<RespuestaNueva>(url, respuestas, { headers });
  }

  editarEntrevista(
    entrevista: EntrevistaSave,
    id: number
  ): Observable<Entrevista> {
    const url = `${this.apiUrl}/entrevistas/${id}`;
    //console.log(url);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Entrevista>(url, entrevista, { headers });
  }

  obtenerPreguntasPorRol(idRol: number): Observable<Pregunta[]> {
    const url = `${this.apiUrl}/preguntas/rol/${idRol}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pregunta[]>(url, { headers });
  }

  obtenerRespuestasPorEntrevista(
    idEntrevista: number
  ): Observable<RespuestaExistente[]> {
    const url = `${this.apiUrl}/respuestas/entrevista/${idEntrevista}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RespuestaExistente[]>(url, { headers });
  }
}
