import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { STRINGS_VALUES } from 'src/environments/environment';
import { SeguridadService } from '../services/seguridad.service';
import { AlertDialogService } from '../services/alert-dialog.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    
    private static LOG_TAG="LoginComponent";
    private appName:string='';
    private loginForm:FormGroup;
    
    constructor(
      public router: Router,
      private route: ActivatedRoute,
      private seguridadService:SeguridadService,
      private formBuilder: FormBuilder,
      private alertDialogService: AlertDialogService
    ) {
        
    }

    ngOnInit() {
        this.appName=STRINGS_VALUES.APP_NAME;
        this.setearValidadorDeFormulario();
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    setearValidadorDeFormulario(){

        let validadores:any={
            username:['',[Validators.required,Validators.minLength(3),this.validarSiElCampoEstaVacio]],
            password:['',[Validators.required,Validators.minLength(6),this.validarSiElCampoEstaVacio]]
        };
        this.loginForm=this.formBuilder.group(validadores); 
    }
    /**
     * Validador que examina si el campo está vacío
     * @param control 
     */
    validarSiElCampoEstaVacio(control: FormControl):any{
        if(! control.value.trim()) return {'el campo no puede estar vacío':true};
        return null;
    }

    async login(data:any){
        let {username,password}=data;

        try{
            let mensaje:any=await this.seguridadService.logearUsuario(username,password);            
            this.alertDialogService.open("Aviso",mensaje);
            this.router.navigate(['/dashboard']);
        }catch(error){
            this.alertDialogService.open("Aviso",error);
        }
    }
}
