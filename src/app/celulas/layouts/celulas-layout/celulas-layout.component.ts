import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-celulas-layout',
  templateUrl: './celulas-layout.component.html',
  styleUrls: ['./celulas-layout.component.css']
})
export class CelulasLayoutComponent {

  private authService = inject( AuthService );

  public user = computed ( () => this.authService.currentUser() );
  
}
