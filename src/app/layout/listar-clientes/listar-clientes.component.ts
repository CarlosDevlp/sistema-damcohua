import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';
import { CustomDatatableComponent } from '../components/custom-datatable/custom-datatable.component';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { Usuario } from 'src/app/models/usuario';
import { STRINGS_VALUES } from 'src/environments/environment';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit, OnDestroy {
  @ViewChild("datatable",{static:false}) dataTable:CustomDatatableComponent;
  private clientes:Array<Cliente>;
  private mostrarExamenDeReglasBoton=true;
  private mostrarFichaMedicaBoton=true;
  private subscription:Subscription;

  constructor(private alertDialogService:AlertDialogService,private clienteService:ClientesService, private seguridadService:SeguridadService ,private router:Router) { }

  ngOnInit() {
    this.clienteService.solicitarClientes().then((clientes:Array<Cliente>)=>{
      this.clientes=clientes;
      this.dataTable.render();
    });

    //habilitar o deshabilitar los botones de examen de reglas y ficha médica
    //dependiendo del tipo de usuario
    this.subscription=this.seguridadService.usuarioObservable.subscribe((usuario:Usuario)=>{
      switch(usuario.empleado.tipoEmpleadoId){
        case STRINGS_VALUES.TIPOS_EMPLEADO.ASISTENTE_ESCUELA_DE_MANEJO:
        case STRINGS_VALUES.TIPOS_EMPLEADO.ASISTENTE_POLICLINICO:
          this.mostrarExamenDeReglasBoton=false; 
          this.mostrarFichaMedicaBoton=false; 
        break;
        case STRINGS_VALUES.TIPOS_EMPLEADO.DOCTOR:
          this.mostrarExamenDeReglasBoton=false; 
        break;
        case STRINGS_VALUES.TIPOS_EMPLEADO.PROFESOR:
          this.mostrarFichaMedicaBoton=false; 
        break;
      }
    });
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  private seleccionarClienteAEditar(cliente:Cliente){
    this.clienteService.clienteSeleccionado=cliente;
    this.router.navigate(['/editar-cliente',cliente.id]);
  }

  private seleccionarClienteParaEditarExamenConduccion(cliente:Cliente){
    this.clienteService.clienteSeleccionado=cliente;
    this.router.navigate(['/mantener-examen-conduccion/cliente',cliente.id]);
  }

  private seleccionarClienteParaMantenerFichaMedica(cliente:Cliente){
    this.clienteService.clienteSeleccionado=cliente;
    this.router.navigate(['/mantener-ficha-medica/cliente',cliente.id]);
  }

  private eliminarCliente(cliente:Cliente){
    this.alertDialogService.openYesNo('','Desea eliminar todos los datos de '+cliente.getNombreCompleto())
    .then(/*yes*/ async ()=>{
      try{
        /*let response=await this.empleadoService.eliminarEmpleado(usuario.id);
        let {message}=response;
        this.alertDialogService.open('',message, 
        /*onclick ()=>{
          location.reload();
        });*/
      }catch(error){
        this.alertDialogService.open('',error);
      }
      
    })
    .catch(/*no*/ ()=>{});

    this.clienteService.eliminarCliente(cliente.id).then(()=>{

    });
  }

}
