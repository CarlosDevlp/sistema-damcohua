import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCitasComponent } from './listar-citas.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
  path: '', component: ListarCitasComponent
  }
];
@NgModule({
  declarations: [ListarCitasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ListarCitasModule { }
