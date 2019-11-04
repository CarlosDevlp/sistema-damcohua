import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TipoDocumento } from 'src/app/models/tipo_documentos';
import { TiposOpcionesService } from 'src/app/services/tipos-opciones.service';
import { Genero } from 'src/app/models/genero';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.scss']
})
export class ModificarPerfilComponent implements OnInit, OnDestroy {
  public static LOG_TAG="ModificarPerfilComponent";

  private mantenerUsuarioForm:FormGroup;
  private usuarioFotoFile:File;
  private usuarioActual:Usuario= Usuario.getEmpty();
  private usuarioObservableSuscripcion:Subscription;
  private generos;
  private tiposDocumento;
  private tiposEmpleado;
  private usuarioTipoDocumento='';
  private usuarioGenero='';
  private usuarioTipoEmpleado='';

  constructor(private seguridadService:SeguridadService, private empleadosService:EmpleadosService,private tipoOpcionesService:TiposOpcionesService,private formBuilder: FormBuilder, private alertDialogService:AlertDialogService) { }

  ngOnInit() {
    this.usuarioObservableSuscripcion=this.seguridadService.usuarioObservable.subscribe(async (usuario:Usuario)=>{
      this.usuarioActual=usuario;
      
      console.log(ModificarPerfilComponent.LOG_TAG,this.usuarioActual.empleado.fotoAdjunto);
      this.solicitarTiposOpciones();
    });
    this.setearValidadorDeFormulario();
  }

  async solicitarTiposOpciones(){
    try{
      this.tiposEmpleado=await this.tipoOpcionesService.obtenerTipoEmpleados();
      this.tiposDocumento=await this.tipoOpcionesService.obtenerTiposDocumento();
      this.generos=await this.tipoOpcionesService.obtenerGeneros();

      for(let i in this.tiposEmpleado){
        if(this.tiposEmpleado[i].id==this.usuarioActual.empleado.tipoEmpleadoId){
          this.usuarioTipoEmpleado=this.tiposEmpleado[i].nombre;
          break;
        }
      }

      for(let i in this.tiposDocumento){
        if(this.tiposDocumento[i].id==this.usuarioActual.empleado.tipoDocumentoId){
          this.usuarioTipoDocumento=this.tiposDocumento[i].nombre;
          break;
        }
      }

      for(let i in this.generos){
        if(this.generos[i].id==this.usuarioActual.empleado.generoId){
          this.usuarioGenero=this.generos[i].nombre;
          break;
        }
      }

      
      
    }catch(error){
      console.log(ModificarPerfilComponent.LOG_TAG,error);
    }
  }

  setearValidadorDeFormulario(){
    let validadores:any={
      //username:[this.usuarioActual.username,[Validators.required,Validators.minLength(3),this.validarSiElCampoEstaVacio]],
      password:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]],
      passwordRepeat:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]],
    };
    this.mantenerUsuarioForm=this.formBuilder.group(validadores,{
      validator:this.passwordsCoinciden
    }); 
  }

  passwordsCoinciden(group: FormGroup) { 
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordRepeat.value;
    return pass === confirmPass ? null : { 'ambos passwords no son iguales': true }; 
  }

  /**
   * Cuando se seleccione una foto del picker
   */
  fotoSeleccionada(foto:File){
    this.usuarioFotoFile=foto;
  }

  /**
   * Validador que examina si el campo está vacío
   * @param control 
   */
  validarSiElCampoEstaVacio(control: FormControl):any{
    if(! control.value.trim()) return {'el campo no puede estar vacío':true};
    return null;
  }

  ngOnDestroy(): void {
    this.usuarioObservableSuscripcion.unsubscribe();
  }

  /**Actualizar los datos del usuario llenados en el formulario */
  private async mantenerUsuario(datos:any){
    let {passwordRepeat}=datos;
    try{
      let response=await this.empleadosService.actualizarUsuarioPasswordYFoto(this.usuarioActual.id,passwordRepeat,this.usuarioFotoFile);
      let {message,data}=response;
      if(data.foto_adjunto){
        this.seguridadService.actualizarFotoPerfilDeUsuario(data.foto_adjunto);
      }
      this.alertDialogService.open('',message);
      console.log(ModificarPerfilComponent.LOG_TAG,data);
    }catch(error){
      this.alertDialogService.open('',error);
    }
  }

}
