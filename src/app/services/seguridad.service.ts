import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { RequestStatus } from '../models/request_status';
import { Empleado } from '../models/empleado';
import { STRINGS_VALUES } from 'src/environments/environment';
import { TiposOpcionesService } from './tipos-opciones.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private static LOG_TAG='SeguridadService';

  public usuarioObservable=new BehaviorSubject<Usuario>(Usuario.getEmpty());
  public logeoStatus:Subject<RequestStatus> = new Subject<RequestStatus>();
  private usuarioAutorizado=false;
  public usuarioAutorizadoObservable=new Subject<boolean>();

  constructor(private router: Router, private location: Location,private activatedRoute :ActivatedRoute, private tiposOpcionesService:TiposOpcionesService, private httpClient:HttpClient) {
    this.inicializar();
  }

  async inicializar(){
    
    this.location.onUrlChange(()=>{
      console.log(SeguridadService.LOG_TAG, this.location.path());  
    });
    
    //verificar validez del token de sesión
    try{
      (await this.verificarValidezToken());
      this.usuarioAutorizado=true;
      this.obtenerUsuarioDeStorage();
    }catch(err){
      //si en cualquier página el usuario NO registrado, llevarlo en el login
      this.borrarTokenYUsuarioDeStorage();
      this.router.navigate(['/login']);
      this.usuarioAutorizado=false;
      
    }
    console.log(SeguridadService.LOG_TAG,this.usuarioAutorizado);
    
    this.usuarioAutorizadoObservable.next(this.usuarioAutorizado);
    this.inhabilitarLogin();
  }

  private inhabilitarLogin(){
    if(this.usuarioAutorizado && this.location.isCurrentPathEqualTo('/login')){
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Actualizar foto de perfil del usuario y guardarlo en el storage
   * @param fotoUrl 
   */
  public actualizarFotoPerfilDeUsuario(fotoUrl:string){
    let usuarioJson=JSON.parse(localStorage.getItem(STRINGS_VALUES.STORAGE_USER_DATA));
    let usuario=this.usuarioObservable.value;
    
    usuarioJson.foto_adjunto=fotoUrl;
    usuario.empleado.fotoAdjunto=fotoUrl;

    this.usuarioObservable.next(usuario);
    localStorage.setItem(STRINGS_VALUES.STORAGE_USER_DATA,JSON.stringify(usuarioJson));
  }

  private guardarUsuarioDeStorage(usuario){
    localStorage.setItem(STRINGS_VALUES.STORAGE_USER_DATA,JSON.stringify(usuario));
  }

  private obtenerUsuarioDeStorage(){
    try{
      let usuarioJson=JSON.parse(localStorage.getItem(STRINGS_VALUES.STORAGE_USER_DATA));
      let usuario=Usuario.getEmpty();
      usuario.setDataFromRequestResponse(usuarioJson);
      this.usuarioObservable.next(usuario);
    }catch{
      
    }
  }


  private guardarTokenEnStorage(token:string){
    localStorage.setItem(STRINGS_VALUES.STORAGE_TOKEN,token);
  }

  private obtenerTokenDeStorage():string{
    return localStorage.getItem(STRINGS_VALUES.STORAGE_TOKEN);
  }

  private borrarTokenYUsuarioDeStorage(){
    this.guardarUsuarioDeStorage(Usuario.getEmpty());
    this.guardarTokenEnStorage('-1');
  }

  public verificarValidezToken():Promise<any>{
    let token=this.obtenerTokenDeStorage();
    return new Promise<any>(async (resolve, reject)=>{
      try{
        if(token){
          let response:any=await this.httpClient.get(STRINGS_VALUES.API_USUARIO_VALIDAR_TOKEN).toPromise();
          //token válido
          if(response.status=='ok'){
            return resolve();
          }
        }
      }catch(err){}
      reject();
    });
  }


  public logearUsuario(username:string, password:string):Promise<any>{    
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage='Las credenciales son incorrectas.';
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_USUARIO_LOGEAR,{surname: username,password}).toPromise();
        
        //dar el token a un objeto usuario y notificarlo
        if(response.status=='ok'){
          let usuario:Usuario=Usuario.getEmpty();
          
          let data:any=response.data[0];
          
          usuario.token=response.token;
          usuario.setDataFromRequestResponse(data);

          this.usuarioObservable.next(usuario);
          this.guardarTokenEnStorage(usuario.token);
          this.guardarUsuarioDeStorage(data);

          console.log(SeguridadService.LOG_TAG,usuario);
          return resolve('Bienvenido al sistema '+usuario.empleado.getNombreCompleto());
          
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public actualizarUsuarioPassword(password:string):Promise<any>{
    return new Promise<any>(async (resolve,reject)=>{
      let errorMessage='Error de servidor. Inténtelo más tarde';
      let usuarioActual=this.usuarioObservable.value;
      try{
        let response:any=await this.httpClient.post(STRINGS_VALUES.API_USUARIO_ACTUALIZAR_DATOS(usuarioActual.id),{password},{params:{actualizar:'password'}}).toPromise();
        if(response.status=='ok'){
          return resolve(response.message);
        }else{
          errorMessage=response.message;
        }
      }catch(err){}
      return reject(errorMessage);
    });
  }

  public deslogearUsuario():Promise<any>{
    return new Promise<any>(async ()=>{
      let token=this.obtenerTokenDeStorage();
      let response:any=await this.httpClient.post(STRINGS_VALUES.API_USUARIO_LOGOUT,{token}).toPromise();
      console.log(response.status);
      this.borrarTokenYUsuarioDeStorage();
      this.router.navigate(['/login']);
    });
  }

}
