import { Injectable } from '@angular/core';
import { TipoDocumento } from '../models/tipo_documentos';
import { TipoEmpleado } from '../models/tipo_empleado';
import { Genero } from '../models/genero';
import { TipoUsuario } from '../models/tipo_usuario';
import { HttpClient } from '@angular/common/http';
import { STRINGS_VALUES } from 'src/environments/environment';
import { GrupoSanguineo } from '../models/grupo_sanguineo';

@Injectable({
  providedIn: 'root'
})
export class TiposOpcionesService {
  private tiposDocumento:Array<TipoDocumento>;
  private tiposEmpleado:Array<TipoEmpleado>;
  private generos:Array<Genero>;
  private tipoUsuarios:Array<TipoUsuario>;
  private gruposSanguineo:Array<GrupoSanguineo>;
  constructor(private httpClient:HttpClient) {
    this.inicializar();
  }

  inicializar(){
    this.tiposDocumento=[];
    this.tiposEmpleado=[];
    this.generos=[];
    this.tipoUsuarios=[];
    this.gruposSanguineo=[];
  }



  public obtenerTiposUsuarios():Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      resolve(this.tipoUsuarios);
    });
  }

  public obtenerGruposSanguineos():Promise<any>{
    return new Promise<any>(async (resolve, reject)=>{
      if(this.gruposSanguineo.length==0){
        try{
          let response:any=await this.httpClient.get(STRINGS_VALUES.API_GRUPOS_SANGUINEOS).toPromise();
          if(response.status=='ok'){
            this.gruposSanguineo=[];
            let {data}=response;
            for(let i in data){
              this.gruposSanguineo.push(new GrupoSanguineo(data[i].id, data[i].nombre));
            }
          }
        }catch(err){
          return reject('No se pudieron obtener los grupos sanguineos');
        }
      }
      resolve(this.gruposSanguineo);
    });
  }

  public obtenerTiposDocumento():Promise<any>{
    return new Promise<any>(async (resolve, reject)=>{
      if(this.tiposDocumento.length==0){
        try{
          let response:any=await this.httpClient.get(STRINGS_VALUES.API_TIPOS_DOCUMENTO).toPromise();
          if(response.status=='ok'){
            this.tiposDocumento=[];
            let {data}=response;
            for(let i in data){
              this.tiposDocumento.push(new TipoDocumento(data[i].id, data[i].nombre));
            }
          }
        }catch(err){
          return reject('No se pudieron obtener los tipos documento');
        }
      }
      resolve(this.tiposDocumento);
    });
  }

  public obtenerTipoEmpleados():Promise<any>{
    return new Promise<any>(async (resolve, reject)=>{
      if(this.tiposEmpleado.length==0){
        try{
          let response:any=await this.httpClient.get(STRINGS_VALUES.API_TIPOS_EMPLEADO).toPromise();
          if(response.status=='ok'){
            this.tiposEmpleado=[];
            let {data}=response;
            for(let i in data){
              this.tiposEmpleado.push(new TipoEmpleado(data[i].id, data[i].nombre));
            }
          }
        }catch(err){
          return reject('No se pudieron obtener los tipos empleado');
        }
      }
      resolve(this.tiposEmpleado);
    });
  }

  public obtenerGeneros():Promise<any>{
    return new Promise<any>(async (resolve, reject)=>{
      if(this.generos.length==0){
        try{
          let response:any=await this.httpClient.get(STRINGS_VALUES.API_GENEROS).toPromise();
          if(response.status=='ok'){
            this.generos=[];
            let {data}=response;
            for(let i in data){
              this.generos.push(new Genero(data[i].id, data[i].nombre));
            }
          }
        }catch(err){
          return reject('No se pudieron obtener los generos');
        }
      }
      resolve(this.generos);
    });
  }
}
