import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MantenerCitaComponent } from './mantener-cita.component';

const routes: Routes = [
  {
  path: '', component: MantenerCitaComponent
  }
];

@NgModule({
  declarations: [MantenerCitaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MantenerCitaModule { }
