import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb          = inject(FormBuilder);
  private authService = inject( AuthService );
  private router      = inject( Router );

  public myForm:FormGroup = this.fb.group({
    login:    ['jvega', [Validators.required, Validators.minLength(5)]],
    password: ['admin123', [Validators.required, Validators.minLength(6)]]
  });

  login(){
    const { login, password } = this.myForm.value;

    this.authService.login (login, password)
      .subscribe ({
        next: () => this.router.navigateByUrl('/postulantes/listado'),
        error: (message) => {
          //console.log({ loginError: error });
          Swal.fire('Error', message, 'error');
        }
      })
    //console.log( this.myForm.value );    
  }

}
