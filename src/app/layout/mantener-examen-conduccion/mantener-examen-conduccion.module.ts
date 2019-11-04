import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenerExamenConduccionComponent } from './mantener-examen-conduccion.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
  path: '', component: MantenerExamenConduccionComponent
  }
];

@NgModule({
  declarations: [MantenerExamenConduccionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class MantenerExamenConduccionModule { }
