import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FichaMedica } from 'src/app/models/ficha_medica';
import { GrupoSanguineo } from 'src/app/models/grupo_sanguineo';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-mantener-ficha-medica',
  templateUrl: './mantener-ficha-medica.component.html',
  styleUrls: ['./mantener-ficha-medica.component.scss']
})
export class MantenerFichaMedicaComponent implements OnInit {
  public static LOG_TAG="MantenerFichaMedicaComponent";
  private mantenerFichaMedicaForm:FormGroup;
  private fichamedicaActual:FichaMedica;
  private gruposSanguineo:Array<GrupoSanguineo>;
  private clienteActual:Cliente;
  constructor(private clientesService:ClientesService,private tiposOpcionesService:TiposOpcionesService,private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.clienteActual=this.clientesService.clienteSeleccionado;
    if(this.clienteActual==undefined){
      this.router.navigate(['listar-clientes']);
    }
    this.obtenerFichaMedicaAEditar();
    this.solicitarTiposOpciones();
    this.setearValidadorDeFormulario();
  }

  private obtenerFichaMedicaAEditar(){
    try{
      this.fichamedicaActual= FichaMedica.getEmpty();
    }catch(e){
      this.router.navigate(['listar-clientes']);
    }
  }


  async solicitarTiposOpciones(){
    try{
      this.gruposSanguineo=await this.tiposOpcionesService.obtenerGruposSanguineos();
      console.log(MantenerFichaMedicaComponent.LOG_TAG,this.gruposSanguineo);
    }catch(error){
      console.log(MantenerFichaMedicaComponent.LOG_TAG,error);
    }
  }

  setearValidadorDeFormulario(){
    let {grupoSanguineoId,observaciones,codigo,tipoResultado,fechaEvaluacion,tipoExamen}=this.fichamedicaActual;
    let validadores:any={
      codigo:[codigo],
      tipoResultado:[tipoResultado],
      fechaEvaluacion:[fechaEvaluacion],
      observaciones:[observaciones],
      grupoSanguineo:[grupoSanguineoId],
      tipoExamen:[tipoExamen]
    };
    this.mantenerFichaMedicaForm=this.formBuilder.group(validadores);
  }

  /**Actualizar o crear los datos de la ficha medica del cliente llenados en el formulario */
  mantenerFichaMedica(datos:any){

  }
}
