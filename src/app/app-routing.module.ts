import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './shared/pages/inicio/inicio.component';
import { ContactoComponent } from './shared/pages/contacto/contacto.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';
import { RolesComponent } from './shared/pages/roles/roles.component';


const routes: Routes = [
  {
    path:'inicio',
    canActivate: [ isAuthenticatedGuard ],
    component: InicioComponent
  },
  {
    path:'roles',
    canActivate: [ isAuthenticatedGuard ],
    component: RolesComponent
  },
  {
    path:'contacto',
    canActivate: [ isAuthenticatedGuard ],
    component: ContactoComponent
  },
  {
    path:'entrevistas',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./entrevistas/entrevistas.module').then(m => m.EntrevistasModule )
  },
  {
    path:'postulantes',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./postulantes/postulantes.module').then(m => m.PostulantesModule )
  },
  {
    path:'procesos',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./procesos/procesos.module').then(m => m.ProcesosModule )
  },
  {
    path:'preguntas',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./preguntas/pregunta.module').then(m => m.PreguntaModule )
  },
  {
    path:'usuarios',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule )
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
