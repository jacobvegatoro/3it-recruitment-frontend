import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-preguntas-layout',
  templateUrl: './preguntas-layout.component.html',
  styleUrls: ['./preguntas-layout.component.css']
})
export class PreguntasLayoutComponent {

  private authService = inject( AuthService );

  public user = computed ( () => this.authService.currentUser() );

}
