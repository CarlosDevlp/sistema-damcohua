import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarClientesComponent } from './listar-clientes.component';
import { Routes, RouterModule } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { ComponentsModule } from '../components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
  path: '', component: ListarClientesComponent
  }
];

@NgModule({
  declarations: [ListarClientesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgbModule
  ],
  providers: [ ]
})
export class ListarClientesModule { }
