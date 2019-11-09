import { Injectable } from '@angular/core';
import { TipoEmpleado } from '../models/tipo_empleado';

import { STRINGS_VALUES } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  public empleadoSeleccionado:Empleado;
  public usuarioSeleccionado:Usuario;
  private tiposEmpleado:Array<TipoEmpleado>;
  constructor(private httpClient: HttpClient) { 
    this.inicializar();
  }

  inicializar(){
    this.tiposEmpleado=[];
 
  }

  /**
   * Contar la cantidad de empleados
   */
  public contarEmpleados():Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.get(STRINGS_VALUES.API_EMPLEADO_CONTAR).toPromise();
        if(response.status=='ok'){
          let {data}=response;
          return resolve(data[0].cantidad);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  /**
   * Obtener toda la lista de empleados
   */
  public solicitarEmpleados():Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.get(STRINGS_VALUES.API_EMPLEADOS).toPromise();
        if(response.status=='ok'){
          let usuarios=[];
          let usuario:Usuario;
          let {data}=response;
          for(let i in data){
            usuario=Usuario.getEmpty();
            usuario.setDataFromRequestResponse(data[i]);
            usuarios.push(usuario);
          }
          return resolve(usuarios);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public registrarEmpleado(formData:FormData):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_EMPLEADOS,formData).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public eliminarEmpleado(idUsuario:number):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.delete(STRINGS_VALUES.API_EMPLEADOS_ELIMINAR(idUsuario)).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public actualizarEmpleado(usuarioId:number, formData:FormData,params:HttpParams):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_USUARIOS_EMPLEADOS_ACTUALIZAR_DATOS(usuarioId),formData,{params}).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public actualizarUsuarioPasswordYFoto(usuarioId:number, password:string,foto:File):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage='Error de servidor. Inténtelo más tarde';
      let modificar_password='1',modificar_foto='1';
      let formData=new FormData();
      formData.append('password',password);
      if(foto!=null){
        formData.append('foto_adjunto',foto,foto.name);
      }
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_USUARIOS_EMPLEADOS_ACTUALIZAR_DATOS(usuarioId),formData,{params:{modificar_password,modificar_foto}}).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }
 
}
