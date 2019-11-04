import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            
            { path: 'listar-clientes', loadChildren: () => import('./listar-clientes/listar-clientes.module').then(m => m.ListarClientesModule) },
            { path: 'listar-empleados', loadChildren: () => import('./listar-empleados/listar-empleados.module').then(m => m.ListarEmpleadosModule) },
            { path: 'listar-citas', loadChildren: () => import('./listar-citas/listar-citas.module').then(m => m.ListarCitasModule) },
            
            { path: 'mantener-cliente', loadChildren: () => import('./mantener-cliente/mantener-cliente.module').then(m => m.MantenerClienteModule) },
            { path: 'agregar-cliente', loadChildren: () => import('./mantener-cliente/mantener-cliente.module').then(m => m.MantenerClienteModule) },
            { path: 'editar-cliente/:id', loadChildren: () => import('./mantener-cliente/mantener-cliente.module').then(m => m.MantenerClienteModule) },
            { path: 'mantener-ficha-medica/cliente/:id', loadChildren: () => import('./mantener-ficha-medica/mantener-ficha-medica.module').then(m => m.MantenerFichaMedicaModule) },
            { path: 'mantener-examen-conduccion/cliente/:id', loadChildren: () => import('./mantener-examen-conduccion/mantener-examen-conduccion.module').then(m => m.MantenerExamenConduccionModule) },

            { path: 'mantener-empleado', loadChildren: () => import('./mantener-empleado/mantener-empleado.module').then(m => m.MantenerEmpleadoModule) },
            { path: 'agregar-empleado', loadChildren: () => import('./mantener-empleado/mantener-empleado.module').then(m => m.MantenerEmpleadoModule) },
            { path: 'editar-empleado/:id', loadChildren: () => import('./mantener-empleado/mantener-empleado.module').then(m => m.MantenerEmpleadoModule) },

            { path: 'mantener-cita', loadChildren: () => import('./mantener-cita/mantener-cita.module').then(m => m.MantenerCitaModule) },
            { path: 'agregar-cita', loadChildren: () => import('./mantener-cita/mantener-cita.module').then(m => m.MantenerCitaModule) },
            { path: 'editar-cita/:id', loadChildren: () => import('./mantener-cita/mantener-cita.module').then(m => m.MantenerCitaModule) },

            { path: 'modificar-perfil', loadChildren: () => import('./modificar-perfil/modificar-perfil.module').then(m => m.ModificarPerfilModule) },

            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
