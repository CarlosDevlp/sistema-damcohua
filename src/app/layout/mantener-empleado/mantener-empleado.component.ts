import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TipoDocumento } from 'src/app/models/tipo_documentos';
import { Genero } from 'src/app/models/genero';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-mantener-empleado',
  templateUrl: './mantener-empleado.component.html',
  styleUrls: ['./mantener-empleado.component.scss']
})
export class MantenerEmpleadoComponent implements OnInit {
  public static LOG_TAG="MantenerEmpleadoComponent";

  private mantenerEmpleadoForm:FormGroup;
  private empleadoId:number;
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

  constructor(private tipoOpcionesService:TiposOpcionesService,private empleadoService:EmpleadosService,private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute, private alertDialogService:AlertDialogService) { }

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
    let {generoId,tipoDocumentoId,tipoEmpleadoId, fechaNacimiento}=this.empleadoActual;
    let {username}=this.usuarioActual;
    let validadQueSeaSoloTexto=Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]*');
    let validadQueSeaNumero=Validators.pattern('[0-9]*');
    let validadores:any={
      nombres:[nombres, [Validators.required, Validators.minLength(3), validadQueSeaSoloTexto]],
      apellidoPaterno:[apellidoPaterno, [Validators.required, Validators.minLength(3), validadQueSeaSoloTexto]],
      apellidoMaterno:[apellidoMaterno, [Validators.required, Validators.minLength(3), validadQueSeaSoloTexto]],
      email:[email, [Validators.required,Validators.email]],
      fechaNacimiento:[fechaNacimiento],
      telefonos:[telefonos, [Validators.required,Validators.minLength(9),validadQueSeaNumero]],
      genero:[generoId , [Validators.required,this.validarQueHayaSeleccionadoUnaOpcion]],
      tipoDocumento:[tipoDocumentoId, [Validators.required,this.validarQueHayaSeleccionadoUnaOpcion]],
      nroIdentificacion:[nroIdentificacion, [Validators.required,Validators.minLength(8),validadQueSeaNumero]],
      pais:[pais, [Validators.required,Validators.minLength(3)]],
      provincia:[provincia, [Validators.required,Validators.minLength(3)]],
      direccion:[direccion, [Validators.required,Validators.minLength(5)]],
      tipoEmpleado:[tipoEmpleadoId, [Validators.required,this.validarQueHayaSeleccionadoUnaOpcion]],
      
      username:[username,[Validators.required,Validators.minLength(3),this.validarSiElCampoEstaVacio]],
      //password:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]],
      //passwordRepeat:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]],
    };

    if(this.modoEdicion){
      validadores.password=[''];
      validadores.passwordRepeat=[''];
    }else{
      validadores.password=['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]];
      validadores.passwordRepeat=['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]];
    }

    this.mantenerEmpleadoForm=this.formBuilder.group(validadores,{
      validator:this.passwordsCoinciden
    }); 
  }
  

  passwordsCoinciden(group: FormGroup) { 
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordRepeat.value;
    return pass === confirmPass ? null : { 'ambos passwords no son iguales': true }; 
  }

  validarQueHayaSeleccionadoUnaOpcion(control: FormControl):any{
    if(control.value==-1) return {'debe selecciona una opcion':true};
    return null;
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
  async mantenerEmpleado(datos:any){
    let {nombres,apellidoPaterno,fechaNacimiento,apellidoMaterno,email,telefonos,genero,tipoDocumento,nroIdentificacion,pais,provincia,direccion,tipoEmpleado}=datos;
    let {username,password}=datos;
    try{
      let response;
      let formData=new FormData();
      formData.append('nombres', nombres);
      formData.append('apellido_paterno', apellidoPaterno);
      formData.append('apellido_materno', apellidoMaterno);
      formData.append('tipo_documento_id', tipoDocumento);
      formData.append('nro_identificacion', nroIdentificacion);
      formData.append('genero_id', genero);
      formData.append('direccion', direccion);
      formData.append('provincia', provincia);
      formData.append('departamento', provincia);
      formData.append('pais', pais);
      formData.append('fecha_nacimiento', fechaNacimiento);
      formData.append('email', email);
      formData.append('telefonos', telefonos);
      formData.append('tipo_empleado_id', tipoEmpleado);
      
      formData.append('username', username);
      formData.append('password', password);

      if(this.empleadoFotoFile!=null){
        formData.append('foto_adjunto',this.empleadoFotoFile,this.empleadoFotoFile.name);
      }

      if(this.modoEdicion) {
        let params:HttpParams=new HttpParams();
        if(password.length>3 && password.trim()!=''){
          params=params.append('modificar_password','1');
        }
        params=params.append('modificar_username','1');
        params=params.append('modificar_foto','1');
        params=params.append('modificar_datos_personales','1');
        response=await this.empleadoService.actualizarEmpleado(this.usuarioActual.id,formData,params);
      } 
      else response=await this.empleadoService.registrarEmpleado(formData);
      let {message,data}=response;
      this.alertDialogService.open('',message, 
      /*onclick*/ ()=>{
        this.router.navigate(['listar-empleados']);
      });
      
    }catch(error){
      this.alertDialogService.open('',error);
    }
  }
}
