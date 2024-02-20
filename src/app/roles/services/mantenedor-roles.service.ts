import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable} from 'rxjs';
import { Rol } from '../interfaces/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class MantenedorRolesService {

  private readonly apiUrl:string = environment.baseUrl;
  private http = inject( HttpClient );
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization',`Bearer ${ this.token }`);

  obtenerRoles():Observable<Rol[]>{
    const url = `${this.apiUrl}/roles`;
    return this.http.get<Rol[]>( url, { headers: this.headers } );
  }

  crearRol(rol:Rol):Observable<Rol>{
    const url = `${ this.apiUrl }/roles`;
    return this.http.post<Rol>(url, rol, { headers: this.headers });
  }

  editarRol(rol:Rol):Observable<Rol>{
    const url = `${ this.apiUrl }/roles/${ rol.id }`;
    return this.http.put<Rol>(url, rol, { headers: this.headers });
  }

}
