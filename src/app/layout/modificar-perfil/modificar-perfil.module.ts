import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModificarPerfilComponent } from './modificar-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { EmpleadosService } from 'src/app/services/empleados.service';

const routes: Routes = [
  {
  path: '', component: ModificarPerfilComponent
  }
];

@NgModule({
  declarations: [ModificarPerfilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  providers: [EmpleadosService]
})
export class ModificarPerfilModule { }
