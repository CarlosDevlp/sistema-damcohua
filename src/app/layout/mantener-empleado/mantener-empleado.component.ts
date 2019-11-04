import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TipoDocumento } from 'src/app/models/tipo_documentos';
import { Genero } from 'src/app/models/genero';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-mantener-empleado',
  templateUrl: './mantener-empleado.component.html',
  styleUrls: ['./mantener-empleado.component.scss']
})
export class MantenerEmpleadoComponent implements OnInit {
  public static LOG_TAG="MantenerEmpleadoComponent";

  private mantenerEmpleadoForm:FormGroup;
  private empleadoId:string;
  private empleadoActual:Empleado= Empleado.getEmpty();
  private usuarioActual:Usuario= Usuario.getEmpty();

  private generos:Array<Genero>;
  private tiposDocumento:Array<TipoDocumento>;
  private tiposEmpleado;

  private modoEdicion:boolean=false;
  private tituloFormulario:string;
  private tituloBotonSubmit:string;

  private empleadoFotoFile:File;

  private empleadoTieneUsuario:boolean;

  constructor(private tipoOpcionesService:TiposOpcionesService,private empleadoService:EmpleadosService,private tiposOpcionesService:TiposOpcionesService,private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerParametroIdCliente();
    this.configurarLabelsDeFormulario();
    if(this.modoEdicion){
      this.obtenerClienteAEditar();
    }
    this.setearValidadorDeFormulario();
    this.solicitarTiposOpciones();
    this.empleadoTieneUsuario=false;
  }

  private obtenerClienteAEditar(){
    try{
      this.usuarioActual= this.empleadoService.usuarioSeleccionado;  //await this.empleadoService.ob(this.empleadoId);
      this.empleadoActual=this.usuarioActual.empleado;
    }catch(e){
      this.router.navigate(['agregar-empleado']);
    }
    
  }

  setearValidadorDeFormulario(){
    let {apellidoPaterno,apellidoMaterno,email,nombres,telefonos,nroIdentificacion,pais,provincia,departamento,direccion}=this.empleadoActual;
    let {generoId,tipoDocumentoId,tipoEmpleadoId}=this.empleadoActual;
    let validadQueSeaSoloTexto=Validators.pattern('[a-zA-Z ]*');
    let validadores:any={
      //password:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]],
      //passwordRepeat:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]],
      nombres:[nombres, [Validators.required, Validators.minLength(3), validadQueSeaSoloTexto]],
      apellidoPaterno:[apellidoPaterno, [Validators.required, Validators.minLength(3), validadQueSeaSoloTexto]],
      apellidoMaterno:[apellidoMaterno, [Validators.required, Validators.minLength(3), validadQueSeaSoloTexto]],
      email:[email,Validators.minLength(6)],
      telefonos:[telefonos],
      genero:[generoId],
      tipoDeDocumento:[tipoDocumentoId],
      nroIdentificacion:[nroIdentificacion],
      pais:[pais],
      provincia:[provincia],
      departamento:[departamento],
      direccion:[direccion],
      tipoEmpleado:[tipoEmpleadoId],
      

    };
    
    this.mantenerEmpleadoForm=this.formBuilder.group(validadores); 
  }
  
  /**
   * Obtener parametro id de ruta
   */
  obtenerParametroIdCliente(){
    this.empleadoId=this.route.snapshot.params.id;
    if(this.empleadoId){
      this.modoEdicion=true;
    }
  }

  configurarLabelsDeFormulario(){
    if(this.modoEdicion){
      this.tituloFormulario="Editar Empleado";
      this.tituloBotonSubmit="Actualizar";
    }else{
      this.tituloFormulario="Registrar Empleado";
      this.tituloBotonSubmit="Registrar";
    }
  }


  async solicitarTiposOpciones(){
    try{
      this.tiposEmpleado=await this.tipoOpcionesService.obtenerTipoEmpleados();
      this.tiposDocumento=await this.tipoOpcionesService.obtenerTiposDocumento();
      this.generos=await this.tipoOpcionesService.obtenerGeneros();
      
    }catch(error){
      console.log(MantenerEmpleadoComponent.LOG_TAG,error);
    }
  }

  /**
   * Cuando se seleccione una foto del picker
   */
  fotoSeleccionada(foto:File){
    this.empleadoFotoFile=foto;
  }

  /**
   * Validador que examina si el campo está vacío
   * @param control 
   */
  validarSiElCampoEstaVacio(control: FormControl):any{
    if(! control.value.trim()) return {'el campo no puede estar vacío':true};
    return null;
  }

  /**Actualizar o crear los datos del empleado llenados en el formulario */
  mantenerEmpleado(datos:any){

  }
}
