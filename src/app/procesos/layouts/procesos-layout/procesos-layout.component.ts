import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-procesos-layout',
  templateUrl: './procesos-layout.component.html',
  styleUrls: ['./procesos-layout.component.css']
})
export class ProcesosLayoutComponent {

  private authService = inject( AuthService );

  public user = computed ( () => this.authService.currentUser() );
  
}
