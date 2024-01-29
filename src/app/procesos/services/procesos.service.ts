import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  obtenerProcesosPorPostulante(idPostulante:number):Observable<Proceso[]>{
    const url = `${this.apiUrl}/procesos/postulante/${idPostulante}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`);
      
    return this.http.get<Proceso[]>( url, { headers } );
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
