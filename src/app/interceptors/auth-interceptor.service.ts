import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { STRINGS_VALUES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  private static LOG_TAG="AuthInterceptorService";
  
  constructor() {

  }

  private guardarTokenEnStorage(token:string){
    localStorage.setItem(STRINGS_VALUES.STORAGE_TOKEN,token);
  }

  private obtenerTokenDeStorage():string{
    return localStorage.getItem(STRINGS_VALUES.STORAGE_TOKEN);
  }


  intercept(request :HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    
    let url=request.urlWithParams;
    
    if(!url.includes('#no-token-needed')){
      let token=this.obtenerTokenDeStorage();
      let headers= new HttpHeaders().append('Authorization','Bearer '+token)
                                  .append('Accept','application/json');
      
      if(url.includes('#formdata')){
        console.log(AuthInterceptorService.LOG_TAG,'formdata');
        url=request.url.replace('#formdata','');
        request= request.clone({headers, url});
      }else{
        headers=headers.append('Content-Type','application/json');
        request= request.clone({headers});
      }
      
      //console.log(AuthInterceptorService.LOG_TAG,"asignado token al header del request");
    }else{
      //console.log(AuthInterceptorService.LOG_TAG,"no es necesario agregarle token");
    }
    return next.handle(request);
  }

}
