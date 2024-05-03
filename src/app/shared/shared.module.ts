import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { RolesComponent } from './pages/roles/roles.component';
import { RolesModule } from '../roles/roles.module';
import { EstadisticasModule } from '../estadisticas/estadisticas.module';



@NgModule({
  declarations: [
    BusquedaComponent,
    ContactoComponent,
    InicioComponent,
    LoadingSpinnerComponent,
    MenuComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RolesModule,
    EstadisticasModule,
  ],
  exports:[
    BusquedaComponent,
    ContactoComponent,
    InicioComponent,
    LoadingSpinnerComponent,
    MenuComponent,
    RolesComponent,
  ]
})
export class SharedModule { }
