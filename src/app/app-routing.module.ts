import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './shared/pages/inicio/inicio.component';
import { AcercaDeComponent } from './shared/pages/acerca-de/acerca-de.component';
import { ContactoComponent } from './shared/pages/contacto/contacto.component';

const routes: Routes = [
  {
    path:'inicio',
    component: InicioComponent
  },
  {
    path:'acerca-de',
    component: AcercaDeComponent
  },
  {
    path:'contacto',
    component: ContactoComponent
  },
  {
    path:'postulantes',
    loadChildren: () => import('./postulantes/postulantes.module').then(m => m.PostulantesModule )
  },
  {
    path:'**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
