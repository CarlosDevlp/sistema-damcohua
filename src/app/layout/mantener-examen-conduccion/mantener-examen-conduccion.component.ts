import { Component, OnInit } from '@angular/core';
import { ExamenReglas } from 'src/app/models/evaluacion_conduccion';
import { ClaseCategoria } from 'src/app/models/clase_categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ValidatorsExpanded } from 'src/app/validators/validators-expanded';

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
  private profesores:Array<Empleado>;
  constructor(private alertDialogService:AlertDialogService, private clientesService:ClientesService,private tiposOpcionesService:TiposOpcionesService,private empleadosService:EmpleadosService,private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.clienteActual=this.clientesService.clienteSeleccionado;
    if(this.clienteActual==undefined || this.clienteActual.clienteId==-1){
      this.router.navigate(['listar-clientes']);
    }
    this.setearValidadorDeFormulario();
    this.solitictarProfesores();
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

  async solitictarProfesores(){
    try{
      this.profesores= await this.empleadosService.solicitarProfesores();
    }catch(e){
      this.profesores=[];
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
    let {empleadoId,claseCategoriaId,observaciones,servicioSolicitado,fechaEvaluacion,restricciones, nroReciboOperacion}=this.examenReglasActual;
    let validadores:any={
      claseCategoria:[claseCategoriaId, [ValidatorsExpanded.validarQueHayaSeleccionadoUnaOpcion]],
      observaciones:[observaciones, [ValidatorsExpanded.validarSiElCampoEstaVacio]],
      servicioSolicitado:[servicioSolicitado, [ValidatorsExpanded.validarSiElCampoEstaVacio] ],
      fechaEvaluacion:[fechaEvaluacion],
      restricciones:[restricciones, [ValidatorsExpanded.validarSiElCampoEstaVacio]],
      nroReciboOperacion:[nroReciboOperacion, [ValidatorsExpanded.validarSiElCampoEstaVacio, ValidatorsExpanded.validadQueSeaNumero]],
      profesor:[empleadoId, [ValidatorsExpanded.validarQueHayaSeleccionadoUnaOpcion]]
    };
    this.mantenerEvaluacionConduccionForm=this.formBuilder.group(validadores);
  }


  /**
   * Cuando se seleccione un archivo del picker
   */
  archivoSeleccionado(archivo:File){
    this.adjuntoFile=archivo;
  }

  /**
   * Enviar data el MTC
   * @param datos 
   */
  async enviarAlMTC(datos:any){
    try{
      let {profesor, nroReciboOperacion,claseCategoria,observaciones,servicioSolicitado,fechaEvaluacion,restricciones}=datos;
      let {adjuntoUrl}=this.examenReglasActual;
      let profesorNombreCompleto='';
      let claseCategoriaNombre='';
      let clienteNombreCompleto=this.clienteActual.getNombreCompleto();
      let clienteDNI=this.clienteActual.nroIdentificacion;

      for(let i in this.profesores){
        if(this.profesores[i].empleadoId==profesor){
          profesorNombreCompleto=this.profesores[i].getNombreCompleto();
          break;
        }
      }

      for(let i in this.clasesCategorias){
        if(this.clasesCategorias[i].id==claseCategoria){
          claseCategoriaNombre=this.clasesCategorias[i].nombre;
          break;
        }
      }
      
      let json=JSON.stringify({clienteNombreCompleto, clienteDNI, profesorNombreCompleto, nroReciboOperacion, claseCategoriaNombre, observaciones,servicioSolicitado,fechaEvaluacion,restricciones, adjuntoUrl});
      let response=await this.clientesService.enviarAlMTCExamenReglas(this.clienteActual.clienteId,json);
      this.alertDialogService.open('',response.message);
    }catch(error){
      this.alertDialogService.open('',error);
    }
  }

  async mantenerExamenReglas(datos:any){
    let {profesor, nroReciboOperacion,claseCategoria,observaciones,servicioSolicitado,fechaEvaluacion,restricciones}=datos;
    try{
      //return console.log(MantenerExamenConduccionComponent.LOG_TAG,fechaEvaluacion);
      let formData=new FormData();
      formData.append('servicio_solicitado', servicioSolicitado);
      formData.append('nro_recibo_operacion', nroReciboOperacion);
      formData.append('fecha_evaluacion', fechaEvaluacion);
      formData.append('restricciones', restricciones);
      formData.append('observaciones', observaciones);
      formData.append('clase_categoria_id', claseCategoria);
      if(profesor!=-1) formData.append('empleados_id', profesor);
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
