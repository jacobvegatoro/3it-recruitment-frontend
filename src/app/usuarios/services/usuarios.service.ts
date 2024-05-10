import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

import { environment } from 'src/environments/environments';
import { Usuario } from '../interfaces/usuario.interface';
import { CacheStore } from '../interfaces/cache-store.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public cacheStore: CacheStore = {
    listadoUsuarios: { term: '', usuarios: [] },
  };

  saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  getAllUsuarios(): Observable<Usuario[]> {
    const url = `${this.apiUrl}/usuarios`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<Usuario[]>(url, { headers })
      .pipe(catchError(() => []));
  }


  getUsuarioById(id: string): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>(url, { headers })
      .pipe(
        map(usuarios => usuarios.length > 0 ? usuarios[0] : null),
        filter(usuario => usuario !== null),
        map(usuario => usuario as Usuario) 
      );
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    const url = `${this.apiUrl}/usuarios/crear`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Usuario>(url, usuario, { headers });
  }

  actualizarUsuario(id: string, usuario: Usuario): Observable<any> {
    const url = `${this.apiUrl}/usuarios/actualizar/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Usuario>(url, usuario, { headers });
  }

  eliminarUsuario(id: string): Observable<any> {
    const url = `${this.apiUrl}/usuarios/eliminar/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Usuario>(url, { headers });
  }
}
