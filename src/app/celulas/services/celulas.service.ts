import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map } from 'rxjs';
import { Celula } from 'src/app/procesos/interfaces/celula.interface';
import { environment } from 'src/environments/environments';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class CelulasService { 

  private readonly apiUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  obtenerCelulas(): Observable<Celula[]> {
    const url = `${this.apiUrl}/celulas`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<Celula[]>(url, { headers })
      .pipe(catchError(() => []));
  }

  getAllClientes(): Observable<Cliente[]> {
    const url = `${this.apiUrl}/clientes`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<Cliente[]>(url, { headers })
      .pipe(catchError(() => []));
  }

  crearCelula(celula: Celula): Observable<Celula> {
    const url = `${this.apiUrl}/celulas/crear`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Celula>(url, celula, { headers });
  }

  obtenerCelulaPorID(id: number): Observable<Celula> {
    const url = `${this.apiUrl}/celulas/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Celula[]>(url, { headers })
      .pipe(
        map(celulas => celulas.length > 0 ? celulas[0] : null),
        filter(celula => celula !== null),
        map(celula => celula as Celula) 
      );
  } 

  actualizarCelula(id: number, celula: Celula): Observable<Celula> {
    const url = `${this.apiUrl}/celulas/actualizar/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Celula>(url, celula, { headers });
  }

  eliminarCelula(id: number): Observable<Celula> {
    const url = `${this.apiUrl}/celulas/eliminar/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Celula>(url, { headers });
  }

}
 