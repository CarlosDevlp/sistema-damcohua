import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { Usuario } from 'src/app/models/usuario';
import { STRINGS_VALUES } from 'src/environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    private appName:string;
    private static LOG_TAG:string="HeaderComponent";
    private usuarioActual:Usuario= Usuario.getEmpty();
    constructor(private translate: TranslateService, public router: Router, private seguridadService:SeguridadService) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.appName=STRINGS_VALUES.APP_NAME;
        this.pushRightClass = 'push-right';
        this.seguridadService.usuarioObservable.subscribe((usuario:Usuario)=>{
            this.usuarioActual=usuario;
            console.log(HeaderComponent.LOG_TAG,usuario);
        });
    }

    obtenerUsuarioActual(){
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    deslogearUsuario() {
        this.seguridadService.deslogearUsuario();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
