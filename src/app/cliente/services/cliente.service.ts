import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Observable, catchError, filter, map } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public cacheStore: CacheStore = {
    listadoClientes: { term: '', clientes: [] },
  };

  saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }
  getAllCliente(): Observable<Cliente[]> {
    const url = `${this.apiUrl}/clientes`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<Cliente[]>(url, { headers })
      .pipe(catchError(() => []));
  }

  getClienteById(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/clientes/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente[]>(url, { headers }).pipe(
      map((clientes) => (clientes.length > 0 ? clientes[0] : null)),
      filter((cliente) => cliente !== null),
      map((cliente) => cliente as Cliente)
    );
  }

  crearCliente(cliente: Cliente): Observable<any> {
    const url = `${this.apiUrl}/clientes/crear`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Cliente>(url, cliente, { headers });
  }

  actualizarCliente(id: string, cliente: Cliente): Observable<any> {
    const url = `${this.apiUrl}/clientes/actualizar/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Cliente>(url, cliente, { headers });
  }

  eliminarCliente(id: string): Observable<any> {
    const url = `${this.apiUrl}/clientes/eliminar/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Cliente>(url, { headers });
  }
}
