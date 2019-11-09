import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { TipoDocumento } from '../models/tipo_documentos';
import { Genero } from '../models/genero';
import { TiposOpcionesService } from './tipos-opciones.service';

import { STRINGS_VALUES } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { FichaMedica } from '../models/ficha_medica';
import { ExamenReglas } from '../models/evaluacion_conduccion';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientes:Array<Cliente>;
  public clienteSeleccionado:Cliente;
  private tiposDocumento:Array<TipoDocumento>;
  private generos:Array<Genero>;
  constructor(private httpClient:HttpClient,private tiposOpcionesService:TiposOpcionesService) { 
    this.inicializar();
  }

  private inicializar(){
    this.clienteSeleccionado=Cliente.getEmpty();
    this.clientes=[];
  }

  /**
   * Contar la cantidad de clientes
   */
  public contarClientes():Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.get(STRINGS_VALUES.API_CLIENTES_CONTAR).toPromise();
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
   * Obtener toda la lista de clientes
   */
  public solicitarClientes():Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.get(STRINGS_VALUES.API_CLIENTES).toPromise();
        if(response.status=='ok'){
          let clientes=[];
          let cliente:Cliente;
          let {data}=response;
          for(let i in data){
            cliente=Cliente.getEmpty();
            cliente.setDataFromRequestResponse(data[i]);
            clientes.push(cliente);
          }
          return resolve(clientes);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  /**
   * Registrar cliente nuevo
   * @param formData 
   */
  public registrarCliente(formData:FormData):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_CLIENTES,formData).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  /**
   * Actualizar datos del cliente
   * @param formData 
   */
  public actualizarCliente(personaId:number,formData:FormData):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_CLIENTES_ACTUALIZAR(personaId),formData).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public obtenerCliente(id:string):Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      for(let i in this.clientes){
        if(this.clientes[i].id==id) return resolve(this.clientes[i]);
      }
      reject(-1);
    });
  }

/**
   * Guardar ficha médica de cliente
   * @param formData 
   */
  public guardarClienteFichaMedica(personaId:number,formData:FormData):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_FICHA_MEDICA(personaId),formData).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  /**
   * Guardar examen de reglas de cliente
   * @param formData 
   */
  public guardarClienteExamenReglas(personaId:number,formData:FormData):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_EXAMEN_REGLAS(personaId),formData).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }


  /**
   * Solicitar ficha medica de cliente
   * @param personaId 
   */
  public solicitarClienteFichaMedica(personaId:number){
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        if(personaId){
          let response:any=await this.httpClient.get(STRINGS_VALUES.API_FICHA_MEDICA(personaId)).toPromise();
          if(response.status=='ok'){
            let fichaMedica= FichaMedica.getEmpty();
            fichaMedica.setDataFromRequestResponse(response.data);
            return resolve(fichaMedica);
          }else{
            errorMessage=response.message;
          }
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  /**
   * Solicitar examen de reglas de cliente
   * @param personaId 
   */
  public solicitarClienteExamenReglas(personaId:number){
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        if(personaId){
          let response:any=await this.httpClient.get(STRINGS_VALUES.API_EXAMEN_REGLAS(personaId)).toPromise();
          if(response.status=='ok'){
            let examenReglas= ExamenReglas.getEmpty();
            examenReglas.setDataFromRequestResponse(response.data);
            return resolve(examenReglas);
          }else{
            errorMessage=response.message;
          }
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public eliminarCliente(id:number):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.delete(STRINGS_VALUES.API_CLIENTE_ELIMINAR(id)).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public enviarAlMTCFichaMedica(id:number,data:string):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_MTC_FICHA_MEDICA(id),{data}).toPromise();
        if(response.status=='ok'){
          return resolve(response);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public enviarAlMTCExamenReglas(id:number,data:string):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage=STRINGS_VALUES.ERROR_MESSAGE_DEFAULT;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_MTC_EXAMEN_REGLAS(id),{data}).toPromise();
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
