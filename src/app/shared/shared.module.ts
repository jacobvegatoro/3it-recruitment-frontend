import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PanelDeAdministracionComponent } from './pages/panel-de-administracion/panel-de-administracion.component';
import { MantenedorRolesComponent } from '../roles/components/mantenedor-roles.component';



@NgModule({
  declarations: [
    BusquedaComponent,
    ContactoComponent,
    InicioComponent,
    LoadingSpinnerComponent,
    MenuComponent,
    PanelDeAdministracionComponent,
    MantenedorRolesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    BusquedaComponent,
    ContactoComponent,
    InicioComponent,
    LoadingSpinnerComponent,
    MenuComponent,
    PanelDeAdministracionComponent,
    MantenedorRolesComponent
  ]
})
export class SharedModule { }
