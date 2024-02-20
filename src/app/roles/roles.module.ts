import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MantenedorRolesComponent } from "./components/mantenedor-roles.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    MantenedorRolesComponent
  ],
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CommonModule
  ],
  exports: [
    MantenedorRolesComponent
  ]
})

export class RolesModule { }
