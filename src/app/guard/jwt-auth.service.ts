import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { Router } from '@angular/router';
import { SeguridadService } from '../services/seguridad.service';
import { Location } from '@angular/common';

@Injectable()
export class JwtAuthService implements CanActivate{
  private static LOG_TAG="JwtAuthService";
  private usuarioAutorizado=false;
  constructor(private router: Router, private seguridadService:SeguridadService, private location: Location) {
    
  }

  
  
  /**
   * Verificamos si el token es válido; es decir, si está en sesión. 
   * Si no es así, se redireccionará siempre al login.
   */
  async canActivate() {
    console.log(JwtAuthService.LOG_TAG,"Ejecutando Auth Guard");
    let permitirAcceso=false;
    try{
      permitirAcceso= await this.seguridadService.usuarioAutorizadoObservable.toPromise();
    }catch(err){
      //si en cualquier página el usuario NO registrado, llevarlo en el login
      permitirAcceso= false;
    }
    console.log(JwtAuthService.LOG_TAG, permitirAcceso);
    if(!permitirAcceso) this.router.navigate(['/login']);
    return permitirAcceso;
  }



}
