import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './shared/pages/inicio/inicio.component';
import { AcercaDeComponent } from './shared/pages/acerca-de/acerca-de.component';
import { ContactoComponent } from './shared/pages/contacto/contacto.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';


const routes: Routes = [
  {
    path:'inicio',
    canActivate: [ isAuthenticatedGuard ],
    component: InicioComponent
  },
  {
    path:'acerca-de',
    canActivate: [ isAuthenticatedGuard ],
    component: AcercaDeComponent
  },
  {
    path:'contacto',
    canActivate: [ isAuthenticatedGuard ],
    component: ContactoComponent
  },
  {
    path:'postulantes',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./postulantes/postulantes.module').then(m => m.PostulantesModule )
  },
  {
    path:'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule )
  },
  {
    path:'**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
