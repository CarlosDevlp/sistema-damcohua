import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Router } from '@angular/router';
import { CustomDatatableComponent } from '../components/custom-datatable/custom-datatable.component';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Usuario } from 'src/app/models/usuario';
import { TipoEmpleado } from 'src/app/models/tipo_empleado';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.scss']
})
export class ListarEmpleadosComponent implements OnInit, OnDestroy {
  
  @ViewChild("datatable",{static:false}) dataTable:CustomDatatableComponent;
  private static LOG_TAG="ListarEmpleadosComponent";
  private usuarios:Array<Usuario>;
  private tiposEmpleados:Array<TipoEmpleado>;
  private usuarioActualEnSesion:Usuario;
  private subscription:Subscription;
  constructor(private tiposOpcionesService:TiposOpcionesService,private location:Location, private seguridadService:SeguridadService,private alerDialogService:AlertDialogService,private empleadoService:EmpleadosService, private router:Router) { }

  ngOnInit() {
    this.empleadoService.solicitarEmpleados().then(async (usuarios:Array<Usuario>)=>{
      (await this.obtenerTiposEmpleados());
      this.usuarios=usuarios;
      this.dataTable.render();
    });

    this.subscription=this.seguridadService.usuarioObservable.subscribe((usuarioActual:Usuario)=>{
      this.usuarioActualEnSesion=usuarioActual;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  private eliminarEmpleado(usuario:Usuario){
    this.alerDialogService.openYesNo('','Desea eliminar todos los datos de '+usuario.empleado.getNombreCompleto())
                          .then(/*yes*/ async ()=>{
                            try{
                              let response=await this.empleadoService.eliminarEmpleado(usuario.id);
                              let {message}=response;
                              this.alerDialogService.open('',message, 
                              /*onclick*/ ()=>{
                                location.reload();
                              });
                            }catch(error){
                              this.alerDialogService.open('',error);
                            }
                            
                          })
                          .catch(/*no*/ ()=>{});
    /*this.empleadoService.eliminarCliente(cliente.id).then(()=>{

    });*/
  }

}
