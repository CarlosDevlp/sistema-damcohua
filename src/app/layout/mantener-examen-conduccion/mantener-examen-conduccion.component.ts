import { Component, OnInit } from '@angular/core';
import { EvaluacionConduccion } from 'src/app/models/evaluacion_conduccion';
import { ClaseCategoria } from 'src/app/models/clase_categoria';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mantener-examen-conduccion',
  templateUrl: './mantener-examen-conduccion.component.html',
  styleUrls: ['./mantener-examen-conduccion.component.scss']
})
export class MantenerExamenConduccionComponent implements OnInit {
  public static LOG_TAG="MantenerEvaluacionConduccionComponent";
  private mantenerEvaluacionConduccionForm:FormGroup;
  private evaluacionconduccionActual:EvaluacionConduccion;
  private clasesCategorias:Array<ClaseCategoria>;
  private clienteActual:Cliente;
  constructor(private clientesService:ClientesService,private tiposOpcionesService:TiposOpcionesService,private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.clienteActual=this.clientesService.clienteSeleccionado;
    if(this.clienteActual==undefined){
      this.router.navigate(['listar-clientes']);
    }
    this.obtenerEvaluacionConduccionAEditar();
    this.solicitarTiposOpciones();
    this.setearValidadorDeFormulario();
  }

  private obtenerEvaluacionConduccionAEditar(){
    try{
      this.evaluacionconduccionActual= EvaluacionConduccion.getEmpty();
    }catch(e){
      this.router.navigate(['listar-clientes']);
    }
  }


  async solicitarTiposOpciones(){
    try{
      this.clasesCategorias=await this.tiposOpcionesService.obtenerClasesCategorias();
    }catch(error){
      console.log(MantenerExamenConduccionComponent.LOG_TAG,error);
    }
  }

  setearValidadorDeFormulario(){
    let {claseCategoria,observaciones,servicioSolicitado,fechaEvaluacion,restricciones, nroReciboOperacion}=this.evaluacionconduccionActual;
    let validadores:any={
      claseCategoria:[claseCategoria],
      observaciones:[observaciones],
      servicioSolicitado:[servicioSolicitado],
      fechaEvaluacion:[fechaEvaluacion],
      restricciones:[restricciones],
      nroReciboOperacion:[nroReciboOperacion]
    };
    this.mantenerEvaluacionConduccionForm=this.formBuilder.group(validadores);
  }


  mantenerEvaluacionConduccion(){

  }
}
