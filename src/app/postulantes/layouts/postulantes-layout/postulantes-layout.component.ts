import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-postulantes-layout',
  templateUrl: './postulantes-layout.component.html',
  styleUrls: ['./postulantes-layout.component.css']
})
export class PostulantesLayoutComponent {

  private authService = inject( AuthService );

  public user = computed ( () => this.authService.currentUser() );

}
