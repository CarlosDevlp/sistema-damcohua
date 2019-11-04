import { Injectable } from '@angular/core';
import { ModalDialogContentComponent } from '../layout/components/modal-dialog-content/modal-dialog-content.component';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  private modalDialog:ModalDialogContentComponent;

  constructor() {

   }

  setDialogElement(modalDialog:ModalDialogContentComponent){
    this.modalDialog=modalDialog;
  }

  open(titulo,mensaje, callbackForOk=()=>{}){
    this.modalDialog.open(titulo,mensaje,callbackForOk);
  }

  openYesNo(titulo,mensaje):Promise<boolean>{
    return this.modalDialog.openYesNo(titulo,mensaje);
  }
}