import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Proceso } from '../interfaces/proceso.interface';
import { Rol } from '../interfaces/rol.interface';
import { Cliente } from '../interfaces/cliente.interface';
import { Celula } from '../interfaces/celula.interface';
import { ProcesoSave } from '../interfaces/proceso-save.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  private readonly apiUrl:string = environment.baseUrl;
  private http = inject( HttpClient );
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization',`Bearer ${ this.token }`);

  obtenerProcesos():Observable<Proceso[]> {
    const url = `${this.apiUrl}/procesos`
    return this.http.get<Proceso[]>(url, {headers: this.headers})
  }

  buscarPorNombre(nombres: string): Observable<Proceso[]> {
    const url = `${this.apiUrl}/procesos/buscar/nombre`;
    const params = new HttpParams().set('nombres', nombres);
    return this.http.get<Proceso[]>(url, { headers: this.headers, params });
  }

  buscarPorApellido(apellidos: string): Observable<Proceso[]> {
    const url = `${this.apiUrl}/procesos/buscar/apellido`;
    const params = new HttpParams().set('apellidos', apellidos);
    return this.http.get<Proceso[]>(url, { headers: this.headers, params });
  }

  buscarPorRol(rol: string): Observable<Proceso[]> {
    const url = `${this.apiUrl}/procesos/buscar/rol`;
    const params = new HttpParams().set('rol', rol);
    return this.http.get<Proceso[]>(url, { headers: this.headers, params });
  }

  buscarPorCelula(celula: string): Observable<Proceso[]> {
    const url = `${this.apiUrl}/procesos/buscar/celula`;
    const params = new HttpParams().set('celula', celula);
    return this.http.get<Proceso[]>(url, { headers: this.headers, params });
  }

  obtenerProcesosPorPostulante(idPostulante:number):Observable<Proceso[]>{
    const url = `${this.apiUrl}/procesos/postulante/${idPostulante}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.get<Proceso[]>( url, { headers } );
  }

  obtenerProcesoPorId( id:number ):Observable<Proceso | null>{
    const url = `${ this.apiUrl }/procesos/${ id }`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.get<Proceso[]>( url, {headers} )
      .pipe(
        map( procesos => procesos.length > 0 ? procesos[0]: null),
        catchError( () => of(null) )
      );
  }

  obtenerRoles():Observable<Rol[]>{

    const url = `${this.apiUrl}/roles`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.get<Rol[]>( url, { headers } );

  }

  obtenerClientes():Observable<Cliente[]>{

    const url = `${this.apiUrl}/clientes`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.get<Cliente[]>( url, { headers } );

  }

  obtenerCelulas():Observable<Celula[]>{

    const url = `${this.apiUrl}/celulas`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.get<Celula[]>( url, { headers } );

  }

  obtenerCelulasPorCliente(idCliente:number):Observable<Celula[]>{

    const url = `${this.apiUrl}/clientes/${idCliente}/celulas`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.get<Celula[]>( url, { headers } );

  }

  crearProceso(proceso:ProcesoSave):Observable<Proceso>{
    const url = `${this.apiUrl}/procesos`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);

    return this.http.post<Proceso>(url, proceso, { headers });
  }

}
