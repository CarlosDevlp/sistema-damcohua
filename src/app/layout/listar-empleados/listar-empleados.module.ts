import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarEmpleadosComponent } from './listar-empleados.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';


const routes: Routes = [
  {
  path: '', component: ListarEmpleadosComponent
  }
];

@NgModule({
  declarations: [ListarEmpleadosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ]
})
export class ListarEmpleadosModule { }
