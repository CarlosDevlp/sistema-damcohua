import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';
import { CustomDatatableComponent } from '../components/custom-datatable/custom-datatable.component';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit {
  @ViewChild("datatable",{static:false}) dataTable:CustomDatatableComponent;
  private clientes:Array<Cliente>;
  constructor(private clienteService:ClientesService, private router:Router) { }

  ngOnInit() {
    this.clienteService.obtenerClientes().then((clientes:Array<Cliente>)=>{
      this.clientes=clientes;
      this.dataTable.render();
    });
    
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
    this.clienteService.eliminarCliente(cliente.id).then(()=>{

    });
  }

}
