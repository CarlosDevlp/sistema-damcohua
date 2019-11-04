import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MantenerEmpleadoComponent } from './mantener-empleado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
  path: '', component: MantenerEmpleadoComponent
  }
];

@NgModule({
  declarations: [MantenerEmpleadoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class MantenerEmpleadoModule { }
