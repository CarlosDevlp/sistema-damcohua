import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MantenerClienteComponent } from './mantener-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
  path: '', component: MantenerClienteComponent
  }
];

@NgModule({
  declarations: [MantenerClienteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class MantenerClienteModule { }
