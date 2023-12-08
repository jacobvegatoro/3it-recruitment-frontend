import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';



@NgModule({
  declarations: [
    InicioComponent,
    AcercaDeComponent,
    MenuComponent,
    ContactoComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    InicioComponent,
    AcercaDeComponent,
    MenuComponent,
    ContactoComponent,
    BusquedaComponent
  ]
})
export class SharedModule { }
