import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from '../../../models/menu_item';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    private menusItems=[];
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService, public router: Router) {
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
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';

        this.menusItems.push(new MenuItem('Dashboard','/dashboard','fa-dashboard'));
        this.menusItems.push(new MenuItem('Clientes','clientes','fa-address-card',
                                [
                                    new MenuItem('Listar Clientes','/listar-clientes','fa-list-alt'),
                                    new MenuItem('Agregar Cliente','/mantener-cliente','fa-plus')
                                ]));
        /*this.menusItems.push(new MenuItem('Doctores','doctores','fa-user-md',
                                [
                                    new MenuItem('Listar Doctores','/listar-doctores','fa-list-alt'),
                                    new MenuItem('Agregar Doctor','/mantener-doctor','fa-plus')
                                ]));*/
        /*this.menusItems.push(new MenuItem('Citas','citas','fa-calendar',[
                                    new MenuItem('Listar Citas','/listar-citas','fa-list-alt'),
                                    new MenuItem('Agregar Cita','/mantener-cita','fa-plus')
                                ]));*/
        this.menusItems.push(new MenuItem('Empleados','empleados','fa-users',
                                [
                                    new MenuItem('Listar Empleados','/listar-empleados','fa-list-alt'),
                                    new MenuItem('Agregar Empleado','/mantener-empleado','fa-plus')
                                ]));
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
