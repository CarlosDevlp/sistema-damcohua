import { Component, OnInit } from '@angular/core';
import { ExamenReglas } from 'src/app/models/evaluacion_conduccion';
import { ClaseCategoria } from 'src/app/models/clase_categoria';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';

@Component({
  selector: 'app-mantener-examen-conduccion',
  templateUrl: './mantener-examen-conduccion.component.html',
  styleUrls: ['./mantener-examen-conduccion.component.scss']
})
export class MantenerExamenConduccionComponent implements OnInit {
  public static LOG_TAG="MantenerEvaluacionConduccionComponent";
  private mantenerEvaluacionConduccionForm:FormGroup;
  private examenReglasActual:ExamenReglas=ExamenReglas.getEmpty();
  private clasesCategorias:Array<ClaseCategoria>;
  private adjuntoFile:File;
  private clienteActual:Cliente;
  constructor(private alertDialogService:AlertDialogService, private clientesService:ClientesService,private tiposOpcionesService:TiposOpcionesService,private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.clienteActual=this.clientesService.clienteSeleccionado;
    if(this.clienteActual==undefined || this.clienteActual.clienteId==-1){
      this.router.navigate(['listar-clientes']);
    }
    this.setearValidadorDeFormulario();
    this.solicitarTiposOpciones();
    this.obtenerExamenReglasAEditar();
  }

  private async obtenerExamenReglasAEditar(){
    try{
      this.examenReglasActual= await this.clientesService.solicitarClienteExamenReglas(this.clienteActual.id);
      this.setearValidadorDeFormulario();
    }catch(e){
      this.examenReglasActual=ExamenReglas.getEmpty();
      //this.router.navigate(['listar-clientes']);
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
    let {claseCategoriaId,observaciones,servicioSolicitado,fechaEvaluacion,restricciones, nroReciboOperacion}=this.examenReglasActual;
    let validadores:any={
      claseCategoria:[claseCategoriaId],
      observaciones:[observaciones],
      servicioSolicitado:[servicioSolicitado],
      fechaEvaluacion:[fechaEvaluacion],
      restricciones:[restricciones],
      nroReciboOperacion:[nroReciboOperacion]
    };
    this.mantenerEvaluacionConduccionForm=this.formBuilder.group(validadores);
  }


  /**
   * Cuando se seleccione un archivo del picker
   */
  archivoSeleccionado(archivo:File){
    this.adjuntoFile=archivo;
  }

  async mantenerExamenReglas(datos:any){
    let {nroReciboOperacion,claseCategoria,observaciones,servicioSolicitado,fechaEvaluacion,restricciones}=datos;
    try{
      return console.log(MantenerExamenConduccionComponent.LOG_TAG,fechaEvaluacion);
      let formData=new FormData();
      formData.append('servicio_solicitado', servicioSolicitado);
      formData.append('nro_recibo_operacion', nroReciboOperacion);
      formData.append('fecha_evaluacion', fechaEvaluacion);
      formData.append('restricciones', restricciones);
      formData.append('observaciones', observaciones);
      formData.append('clase_categoria_id', claseCategoria);
      formData.append('empleados_id', '1');
      if(this.adjuntoFile!=null){
        formData.append('adjunto',this.adjuntoFile,this.adjuntoFile.name);
      }
      
      let response=await this.clientesService.guardarClienteExamenReglas(this.clienteActual.id,formData);
      let {message}=response;
      this.alertDialogService.open('',message, 
      /*onclick*/ ()=>{
        this.router.navigate(['listar-clientes']);
      });
      
    }catch(error){
      this.alertDialogService.open('',error);
    }
  }
}
