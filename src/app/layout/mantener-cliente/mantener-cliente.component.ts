import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { TipoDocumento } from 'src/app/models/tipo_documentos';
import { Genero } from 'src/app/models/genero';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { ClientesService } from 'src/app/services/clientes.service';

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
  private tiposDeDocumento:Array<TipoDocumento>;
  private generos:Array<Genero>;
  private modoEdicion:boolean=false;
  private tituloFormulario:string;
  private tituloBotonSubmit:string;

  constructor(private clientesService:ClientesService,private tiposOpcionesService:TiposOpcionesService,private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.obtenerParametroIdCliente();
    this.configurarLabelsDeFormulario();
    this.setearValidadorDeFormulario();
    if(this.modoEdicion){
      await this.obtenerClienteAEditar();
      this.setearValidadorDeFormulario();
    }
    this.tiposDeDocumento=await this.tiposOpcionesService.obtenerTiposDocumento();
    this.generos=await this.tiposOpcionesService.obtenerGeneros();
    
  }

  async obtenerClienteAEditar(){
    try{
      this.clienteActual=await this.clientesService.obtenerCliente(this.clienteId);
    }catch(e){
      this.router.navigate(['agregar-cliente']);
    }
    
  }

  setearValidadorDeFormulario(){
    let {genero,tipoDocumento,donacionOrganos}=this.clienteActual;
    let validadores:any={
      password:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]],
      passwordRepeat:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]],
      genero:[genero.id],
      tipoDeDocumento:[tipoDocumento.id],
      donacionOrganos:[donacionOrganos]
    };
    this.mantenerClienteForm=this.formBuilder.group(validadores); 
  }

  mantenerCliente(){

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
}
