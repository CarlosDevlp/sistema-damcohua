import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Router } from '@angular/router';
import { CustomDatatableComponent } from '../components/custom-datatable/custom-datatable.component';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Usuario } from 'src/app/models/usuario';
import { TipoEmpleado } from 'src/app/models/tipo_empleado';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.scss']
})
export class ListarEmpleadosComponent implements OnInit {
  @ViewChild("datatable",{static:false}) dataTable:CustomDatatableComponent;
  private usuarios:Array<Usuario>;
  private tiposEmpleados:Array<TipoEmpleado>;
  constructor(private tiposOpcionesService:TiposOpcionesService,private empleadoService:EmpleadosService, private router:Router) { }

  ngOnInit() {
    this.empleadoService.solicitarEmpleados().then(async (usuarios:Array<Usuario>)=>{
      (await this.obtenerTiposEmpleados());
      this.usuarios=usuarios;
      this.dataTable.render();
    });
  }

  private async obtenerTiposEmpleados(){
    try{
      this.tiposEmpleados=await this.tiposOpcionesService.obtenerTipoEmpleados();
    }catch(err){}
  }

  private obtenerTipoEmpleadoNombre(empleado:Empleado){
    for(let i in this.tiposEmpleados){
      if(this.tiposEmpleados[i].id==empleado.tipoEmpleadoId){
        return this.tiposEmpleados[i].nombre;
      }
    }
    return "No definido";
  }

  private seleccionarEmpleadoAEditar(usuario:Usuario){
    this.empleadoService.usuarioSeleccionado=usuario;
    this.router.navigate(['/editar-empleado',usuario.empleado.empleadoId]);
  }

  private eliminarEmpleado(empleado:Empleado){
    /*this.empleadoService.eliminarCliente(cliente.id).then(()=>{

    });*/
  }

}
