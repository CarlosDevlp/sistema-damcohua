import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenerFichaMedicaComponent } from './mantener-ficha-medica.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
  path: '', component: MantenerFichaMedicaComponent
  }
];

@NgModule({
  declarations: [MantenerFichaMedicaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class MantenerFichaMedicaModule { }
