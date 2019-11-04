import { Injectable } from '@angular/core';
import { TipoEmpleado } from '../models/tipo_empleado';

import { STRINGS_VALUES } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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
   * Obtener toda la lista de empleados
   */
  public solicitarEmpleados():Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage='Error de servidor. Inténtelo más tarde';
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
