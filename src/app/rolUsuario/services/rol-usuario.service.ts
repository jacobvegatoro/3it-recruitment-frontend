import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { rolUsuario } from '../interfaces/rol-usuario.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RolUsuarioService {
  private readonly apiUrl: string = environment.baseUrl;
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.actualizarHeaders();
  }

  private actualizarHeaders() {
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  obtenerRolesUsuario(): Observable<rolUsuario[]> {
    const url = `${this.apiUrl}/rolesUsuarios`;
    this.actualizarHeaders();
    return this.http.get<rolUsuario[]>(url, { headers: this.headers });
  }
}
