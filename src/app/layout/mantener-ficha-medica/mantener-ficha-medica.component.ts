import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FichaMedica } from 'src/app/models/ficha_medica';
import { GrupoSanguineo } from 'src/app/models/grupo_sanguineo';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { Empleado } from 'src/app/models/empleado';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';
import { ValidatorsExpanded } from 'src/app/validators/validators-expanded';

@Component({
  selector: 'app-mantener-ficha-medica',
  templateUrl: './mantener-ficha-medica.component.html',
  styleUrls: ['./mantener-ficha-medica.component.scss']
})
export class MantenerFichaMedicaComponent implements OnInit {
  public static LOG_TAG="MantenerFichaMedicaComponent";
  private mantenerFichaMedicaForm:FormGroup;
  private fichamedicaActual:FichaMedica=FichaMedica.getEmpty();
  private gruposSanguineo:Array<GrupoSanguineo>;
  private adjuntoFile:File;
  private doctores:Array<Empleado>;
  private clienteActual:Cliente;
  constructor(private clientesService:ClientesService,private empleadosService:EmpleadosService,private tiposOpcionesService:TiposOpcionesService, private alertDialogService:AlertDialogService, private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.clienteActual=this.clientesService.clienteSeleccionado;
    if(this.clienteActual==undefined || this.clienteActual.clienteId==-1){
      this.router.navigate(['listar-clientes']);
    }
    this.obtenerFichaMedicaAEditar();
    this.solicitarTiposOpciones();
    this.solitictarDoctores();
    this.setearValidadorDeFormulario();
  }

  private async obtenerFichaMedicaAEditar(){
    try{
      this.fichamedicaActual= await this.clientesService.solicitarClienteFichaMedica(this.clienteActual.id);
      this.setearValidadorDeFormulario();
    }catch(e){
      this.fichamedicaActual=FichaMedica.getEmpty();
    }
  }

  async solitictarDoctores(){
    try{
      this.doctores= await this.empleadosService.solicitarDoctores();
    }catch(e){
      this.doctores=[];
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
    let {empleadoId,grupoSanguineoId,observaciones,codigo,tipoResultado,fechaEvaluacion,tipoExamen}=this.fichamedicaActual;
    let validadores:any={
      //codigo:[codigo],
      tipoResultado:[tipoResultado,[ValidatorsExpanded.validarSiElCampoEstaVacio]],
      fechaEvaluacion:[fechaEvaluacion],
      observaciones:[observaciones, [ValidatorsExpanded.validarSiElCampoEstaVacio]],
      grupoSanguineo:[grupoSanguineoId,  [ValidatorsExpanded.validarQueHayaSeleccionadoUnaOpcion]],
      tipoExamen:[tipoExamen, [ValidatorsExpanded.validarSiElCampoEstaVacio]],
      doctor:[empleadoId, [ValidatorsExpanded.validarQueHayaSeleccionadoUnaOpcion] ]
    };
    this.mantenerFichaMedicaForm=this.formBuilder.group(validadores);
  }

  /**
   * Cuando se seleccione un archivo del picker
   */
  archivoSeleccionado(archivo:File){
    this.adjuntoFile=archivo;
  }

  async enviarAlMTC(datos:any){
    try{
      console.log(MantenerFichaMedicaComponent.LOG_TAG,datos);
      let {tipoResultado, fechaEvaluacion, observaciones, grupoSanguineo, tipoExamen, doctor}=datos;
      let {adjuntoUrl}=this.fichamedicaActual;
      let doctorNombreCompleto='';
      let grupoSanguineoNombre='';
      let clienteNombreCompleto=this.clienteActual.getNombreCompleto();
      let clienteDNI=this.clienteActual.nroIdentificacion;

      for(let i in this.doctores){
        if(this.doctores[i].empleadoId==doctor){
          doctorNombreCompleto=this.doctores[i].getNombreCompleto();
          break;
        }
      }

      for(let i in this.gruposSanguineo){
        if(this.gruposSanguineo[i].id==grupoSanguineo){
          grupoSanguineoNombre=this.gruposSanguineo[i].nombre;
          break;
        }
      }
      
      let json=JSON.stringify({clienteNombreCompleto, clienteDNI,grupoSanguineoNombre,doctorNombreCompleto,tipoResultado, fechaEvaluacion, observaciones, tipoExamen, doctor, adjuntoUrl});
      let response=await this.clientesService.enviarAlMTCFichaMedica(this.clienteActual.clienteId,json);
      this.alertDialogService.open('',response.message);
    }catch(error){
      this.alertDialogService.open('',error);
    }
  }

  /**Actualizar o crear los datos de la ficha medica del cliente llenados en el formulario */
  async mantenerFichaMedica(datos:any){
    let {tipoResultado, fechaEvaluacion, observaciones, grupoSanguineo, tipoExamen, doctor}=datos;
    try{
      //return console.log(MantenerExamenConduccionComponent.LOG_TAG,fechaEvaluacion);
      let formData=new FormData();
      formData.append('tipo_resultado_examen', tipoResultado);
      formData.append('fecha_evaluacion', fechaEvaluacion);
      formData.append('grupo_sanguineo_id', grupoSanguineo);
      formData.append('observaciones', observaciones);
      formData.append('tipo_examen', tipoExamen);
      if(doctor!=-1) formData.append('empleados_id', doctor);
      if(this.adjuntoFile!=null){
        formData.append('adjunto',this.adjuntoFile,this.adjuntoFile.name);
      }
      
      let response=await this.clientesService.guardarClienteFichaMedica(this.clienteActual.id,formData);
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
