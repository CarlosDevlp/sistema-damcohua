import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { TipoDocumento } from 'src/app/models/tipo_documentos';
import { Genero } from 'src/app/models/genero';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';

@Component({
  selector: 'app-mantener-cliente',
  templateUrl: './mantener-cliente.component.html',
  styleUrls: ['./mantener-cliente.component.scss']
})
export class MantenerClienteComponent implements OnInit {
  public static LOG_TAG="MantenerClienteComponent";

  private mantenerClienteForm:FormGroup;
  private clienteId:string;
  private clienteActual:Cliente= Cliente.getEmpty();
  private tiposDocumento:Array<TipoDocumento>;
  private generos:Array<Genero>;
  private modoEdicion:boolean=false;
  private tituloFormulario:string;
  private tituloBotonSubmit:string;
  private estadosCivil:Array<string>;
  private clienteFotoFile:File;
  private clienteAdjuntoFile:File;

  constructor(private alertDialogService:AlertDialogService,private clientesService:ClientesService,private tiposOpcionesService:TiposOpcionesService,private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }

  async ngOnInit() {

    this.estadosCivil=['Soltero','Casado','Conviviendo','Divorciado'];

    this.obtenerParametroIdCliente();
    this.configurarLabelsDeFormulario();
    this.setearValidadorDeFormulario();
    if(this.modoEdicion){
      await this.obtenerClienteAEditar();
      this.setearValidadorDeFormulario();
    }
    this.tiposDocumento=await this.tiposOpcionesService.obtenerTiposDocumento();
    this.generos=await this.tiposOpcionesService.obtenerGeneros();
    
  }

  async obtenerClienteAEditar(){
    try{
      this.clienteActual=this.clientesService.clienteSeleccionado;
      if(this.clienteActual.clienteId==-1) throw new Error("el cliente seleccionado no puede ser null");
    }catch(e){
      this.router.navigate(['agregar-cliente']);
    }
    
  }

  setearValidadorDeFormulario(){
    let {apellidoPaterno,apellidoMaterno,email,nombres,telefonos,nroIdentificacion,pais,provincia,departamento,direccion}=this.clienteActual;
    let {donacionOrganos,nroLicenciaConducir, generoId, tipoDocumentoId, fechaNacimiento, estadoCivil}=this.clienteActual;
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
      estadoCivil:[estadoCivil, [Validators.required,Validators.minLength(3)]],
      donacionOrganos:[donacionOrganos],
      nroLicenciaConducir:[nroLicenciaConducir, [Validators.required, Validators.minLength(3)]]
    };
    this.mantenerClienteForm=this.formBuilder.group(validadores); 
  }


  validarQueHayaSeleccionadoUnaOpcion(control: FormControl):any{
    if(control.value==-1) return {'debe selecciona una opcion':true};
    return null;
  }

  /**
   * Obtener parametro id de ruta
   */
  obtenerParametroIdCliente(){
    this.clienteId=this.route.snapshot.params.id;
    if(this.clienteId){
      this.modoEdicion=true;
    }
  }

  configurarLabelsDeFormulario(){
    if(this.modoEdicion){
      this.tituloFormulario="Editar cliente";
      this.tituloBotonSubmit="Actualizar";
    }else{
      this.tituloFormulario="Registrar Cliente";
      this.tituloBotonSubmit="Registrar";
    }
  }

  /**
   * Validador que examina si el campo está vacío
   * @param control 
   */
  validarSiElCampoEstaVacio(control: FormControl):any{
    if(! control.value.trim()) return {'el campo no puede estar vacío':true};
    return null;
  }

  /**
   * Cuando se seleccione una foto del picker
   */
  fotoSeleccionada(foto:File){
    this.clienteFotoFile=foto;
  }

/**
   * Cuando se seleccione un archivo del picker
   */
  archivoSeleccionado(archivo:File){
    this.clienteAdjuntoFile=archivo;
  }

  async mantenerCliente(datos:any){
    let {nombres,apellidoPaterno,fechaNacimiento,apellidoMaterno,email,telefonos,genero,tipoDocumento,nroIdentificacion,pais,provincia,direccion}=datos;
    let {estadoCivil,donacionOrganos,nroLicenciaConducir}=datos;
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
      formData.append('estado_civil', estadoCivil);
      formData.append('donacion_organos', (donacionOrganos?'1':'0'));
      formData.append('nro_licencia_conducir',nroLicenciaConducir);
      formData.append('tipo_estado_id','1');

      if(this.clienteFotoFile!=null){
        formData.append('foto_adjunto',this.clienteFotoFile,this.clienteFotoFile.name);
      }

      if(this.clienteAdjuntoFile!=null){
        formData.append('adjunto',this.clienteAdjuntoFile,this.clienteAdjuntoFile.name);
      }
      
      if(this.modoEdicion) response=await this.clientesService.actualizarCliente(this.clienteActual.id,formData);
      else response=await this.clientesService.registrarCliente(formData);
      let {message,data}=response;
      this.alertDialogService.open('',message, 
      /*onclick*/ ()=>{
        this.router.navigate(['listar-clientes']);
      });
      
    }catch(error){
      this.alertDialogService.open('',error);
    }
  }
}
