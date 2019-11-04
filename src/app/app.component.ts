import { Component, OnInit, ViewChild } from '@angular/core';
import { SeguridadService } from './services/seguridad.service';
import { AlertDialogService } from './services/alert-dialog.service';
import { ModalDialogContentComponent } from './layout/components/modal-dialog-content/modal-dialog-content.component';
import { Router } from '@angular/router';
import { RequestStatus } from './models/request_status';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('dialogMain',{static:true}) dialogElement:ModalDialogContentComponent;
    constructor(private route:Router,private seguridadService:SeguridadService, private alertDialogService:AlertDialogService) {
    }

    ngOnInit() {
        this.alertDialogService.setDialogElement(this.dialogElement);
        this.checkSessionStatus();
    }

    checkSessionStatus(){
        /*this.seguridadService.logeoStatus.subscribe((requestStatus:RequestStatus)=>{
            
            if(requestStatus.error){
                this.route.navigate(['login']);
            }else{
                this.route.navigate(['dashboard']);
                
                console.log('ir al dashboard');
            }
        });*/
    }
}
