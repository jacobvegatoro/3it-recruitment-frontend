import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    AcercaDeComponent,
    BusquedaComponent,
    ContactoComponent,
    InicioComponent,
    LoadingSpinnerComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AcercaDeComponent,
    BusquedaComponent,
    ContactoComponent,
    InicioComponent,
    LoadingSpinnerComponent,
    MenuComponent,
  ]
})
export class SharedModule { }
